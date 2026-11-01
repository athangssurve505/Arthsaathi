const userModel = require("../models/user.model");
const sessionModel = require("../models/session.model");
const emailVerificationModel = require("../models/emailVerification.model")

const {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpiryDate,
} = require("../utils/token.util");
const { success, error } = require("../utils/apiResponse.util");

const parseUserAgent = require("../utils/device.util");


const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/brevo.util");

const verificationTemplate = require("../utils/verificationMailTemplate");
const getIpLocation = require("../utils/getIpLocation.utils");

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account
 * @access  Public
 */

async function register(req, res) {
  try {
    const { fullName, email, password } = req.body;

    // Check if email is already registered
    if (await userModel.exists({ email })) {
      return error(res, 409, "An account with this email already exists.");
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // Create a token for user to verify the email
    const verificationToken =crypto.randomBytes(32).toString("hex");

    // Hash it and store in the collection => emailVerification
    const tokenHash = crypto.createHash("sha256").update(verificationToken).digest("hex");

    // Create a verification link 
    const verificationLink =
      `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;


// Create a collection record of the token send
 await emailVerificationModel.create({
  user: user._id,
  tokenHash,
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
});

// Send mail to user email
    await sendEmail({
    to:user.email,
    subject:"Verify Email",
    html:verificationTemplate(
        user.fullName,
        verificationLink
    )
});

    // Return the newly created user (excluding password)
    return success(res, 201, "Registration successful", {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });

  } catch (err) {
    return error(res, 500, "Registration failed", err.message);
  }
}

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate a user, create a new session, issue an access token,
 *          and store the refresh token in an HttpOnly cookie.
 * @access  Public
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const locationDetails  = await getIpLocation(req.ip);

    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return error(res, 401, "Invalid email or password");
    }

    // Verify the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return error(res, 401, "Invalid email or password");
    }

    // Check whether email is Verified
    if(!user.emailVerified){
      await emailVerificationModel.deleteMany({user:user._id});

       // Create a token for user to verify the email
      const verificationToken =crypto.randomBytes(32).toString("hex");
 
    // Hash it and store in the collection => emailVerification
      const tokenHash = crypto.createHash("sha256").update(verificationToken).digest("hex");

    // Create a verification link 
      const verificationLink =
      `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;


    // Create a collection record of the token send
    await emailVerificationModel.create({
      user: user._id,
      tokenHash,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    // Send mail to user email
    await sendEmail({
    to:user.email,
    subject:"Verify Email",
    html:verificationTemplate(
        user.fullName,
        verificationLink
    )
    });

    return error(res,403,"Email not verified. A new verification email has been sent.");
 }


    // Create a new session
    const session = await sessionModel.create({
      user: user._id,
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip,
      lastUsedAt:new Date(),
      expiresAt: getRefreshTokenExpiryDate(),
      location:locationDetails
      
    });

    // Generate a refresh token for this session
    const refreshToken = generateRefreshToken(session._id);

    // Hash the refresh token before storing it
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    // Save the hashed refresh token in the session
    session.refreshTokenHash = hashedRefreshToken;
    await session.save();

    // Store the refresh token in an HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Generate a new access token
    const accessToken = generateAccessToken(user);

    // Send the response
    return success(res, 200, "Login successful", {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      accessToken,
    });

  } catch (err) {
    return error(res, 500, "Login failed", err.message);
  }
}


/**
 * @route   POST /api/auth/logout
 * @desc    Logout the current user by revoking the active session
 *          and clearing the refresh token cookie.
 * @access  Private
 */
async function logout(req, res) {
  try {
    // Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return error(res, 401, "Refresh token not found");
    }

    // Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Find the session associated with the refresh token
    const session = await sessionModel.findById(decoded.sessionId);

    // Check if the session exists
    if (!session) {
      return error(res, 401, "Session not found");
    }

    // Check if the session has already been revoked
    if (session.isRevoked) {
      return error(res, 401, "Session already revoked");
    }

    // Verify the refresh token matches the stored hash
    const isValidToken = await bcrypt.compare(
      refreshToken,
      session.refreshTokenHash
    );

    if (!isValidToken) {
      return error(res, 401, "Invalid refresh token");
    }

    // Revoke the current session
    session.isRevoked = true;
    await session.save();

    // Remove the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Send success response
    return success(res, 200, "Logged out successfully");

  } catch (err) {
    return error(res, 401, "Invalid or expired refresh token:" ,err.message);
  }
}

/**
 * @route   POST /api/auth/logout-all-devices
 * @desc    Logout the user from all devices by revoking all active sessions
 *          and clearing the current refresh token cookie.
 * @access  Private
 */
async function logout_all_devices(req, res) {
  try {
    // Get refresh token from the HttpOnly cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return error(res, 401, "Refresh token not found");
    }

    // Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Find the current session
    const session = await sessionModel.findById(decoded.sessionId);

    if (!session) {
      return error(res, 401, "Session not found");
    }

    // Check if the session has already been revoked
    if (session.isRevoked) {
      return error(res, 401, "Session already revoked");
    }

    // Verify the refresh token matches the stored hash
    const isValidToken = await bcrypt.compare(
      refreshToken,
      session.refreshTokenHash
    );

    if (!isValidToken) {
      return error(res, 401, "Invalid refresh token");
    }

    // Revoke all sessions belonging to this user
    await sessionModel.updateMany(
      { user: session.user },
      { isRevoked: true }
    );

    // Clear the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Send success response
    return success(
      res,
      200,
      "Logged out from all devices successfully"
    );

  } catch (err) {
    return error(res, 401, "Invalid or expired refresh token");
  }
}
  
/**
 * @route   POST /api/auth/refresh-token
 * @desc    Rotate the refresh token, issue a new access token,
 *          and replace the refresh token cookie.
 * @access  Private
 */
async function rotateToken(req, res) {
  try {
    // Get the refresh token from the HttpOnly cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return error(res, 401, "Refresh token not found",{
        code:"REFRESH_TOKEN_EXPIRED_OR_INVALID"
      });
    }

    // Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Find the session associated with the refresh token
    const session = await sessionModel.findById(decoded.sessionId);

    if (!session) {
      return error(res, 401, "Session not found",
        {
        code:"SESSION_EXPIRED"
      }
      );
    }

    // Check if the session has been revoked
    if (session.isRevoked) {
      return error(res, 401, "Session has been revoked",
        {
        code:"SESSION_EXPIRED"
      }
      );
    }

    // Verify the refresh token matches the stored hash
    const isValidToken = await bcrypt.compare(
      refreshToken,
      session.refreshTokenHash
    );

    if (!isValidToken) {
      return error(res, 401, "Invalid refresh token",{
        code:"REFRESH_TOKEN_EXPIRED_OR_INVALID"
      });
    }

    // Generate a new refresh token
    const newRefreshToken = generateRefreshToken(session._id);

    // Hash the new refresh token before storing it
    const refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);

    // Update the session with the new refresh token hash
    session.refreshTokenHash = refreshTokenHash;
    session.expiresAt = getRefreshTokenExpiryDate();
    session.lastUsedAt = new Date();

    await session.save();

    // Generate a new access token
    const newAccessToken = generateAccessToken(session.user);

    // Replace the old refresh token cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send the new access token
    return success(
      res,
      200,
      "Token rotated successfully",
      {
        accessToken: newAccessToken,
      }
    );

  } catch (err) {
    return error(res, 401, "Invalid or expired refresh token",{
       code:"REFRESH_TOKEN_EXPIRED_OR_INVALID"
      });
  }
}

async function verifyEmail (req, res) {
  try {
    // Get the raw verification token from the request body
    const { token } = req.body;

    // Check if the token was provided
    if (!token) {
      return error(res, 400, "Verification token is required.");
    }

    // Hash the received token using the same algorithm
    // that was used while storing it in the database.
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find the verification record using the hashed token
    const verification = await emailVerificationModel.findOne({
      tokenHash,
    });

    // If no matching record exists, the token is invalid
    if (!verification) {
      return error(res, 400, "Invalid verification link.");
    }

    // Check whether the verification link has expired
    if (verification.expiresAt < new Date()) {
      // Delete the expired record to keep the database clean
      await emailVerificationModel.deleteOne({
        _id: verification._id,
      });

      return error(res, 400, "Verification link has expired.");
    }

    // Find the user associated with this verification request
    const user = await userModel.findById(verification.user);

    // User doesn't exist anymore
    if (!user) {
      await emailVerificationModel.deleteOne({
        _id: verification._id,
      });

      return error(res, 404, "User not found.");
    }

    // Prevent verifying an already verified account
    if (user.emailVerified) {
      await emailVerificationModel.deleteOne({
        _id: verification._id,
      });

      return success(res, 200, "Email is already verified.");
    }

    // Mark the user's email as verified
    user.emailVerified = true;
    await user.save();

    // Delete the verification token since it is one-time use
    await emailVerificationModel.deleteOne({
      _id: verification._id,
    });

    return success(
      res,
      200,
      "Email verified successfully."
    );
  } catch (err) {
    console.error("[Verify Email Error]:", err);

    return error(
      res,
      500,
      "Something went wrong while verifying your email."
    );
  }
};


async function getUser (req,res) {
  const { success, error } = require("../utils/apiResponse.util");

  try {
    // req.user is attached by the authenticate middleware
    const user = req.user;

    return success(res, 200, "User fetched successfully.", {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        emailVerified: user.emailVerified,

      },
    });

  } catch (err) {
    return error(
      res,
      500,
      "Something went wrong while fetching user details.",
      err.message
    );
  }
}




  async function getActiveSessions(req, res) {
  try {

    // --------------------------------------------------
    // 1. Get the current user's refresh token
    // --------------------------------------------------

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return error(
        res,
        401,
        "Refresh token not found.",
        {
          code: "REFRESH_TOKEN_NOT_FOUND",
        }
      );
    }


    // --------------------------------------------------
    // 2. Verify refresh token
    // --------------------------------------------------

    let decoded;

    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
    } catch (err) {
      return error(
        res,
        401,
        "Invalid or expired refresh token.",
        {
          code: "REFRESH_TOKEN_INVALID",
        }
      );
    }


    // --------------------------------------------------
    // 3. Get current session ID
    // --------------------------------------------------

    const currentSessionId = decoded.sessionId;


    // --------------------------------------------------
    // 4. Find all active sessions of the user
    // --------------------------------------------------

    const sessions = await sessionModel
      .find({
        user: req.user.id,
        isRevoked: false,
        expiresAt: {
          $gt: new Date(),
        },
      })
      .sort({
        lastUsedAt: -1,
      });


    // --------------------------------------------------
    // 5. Format sessions for frontend
    // --------------------------------------------------

    const formattedSessions = sessions.map((session) => {

      const deviceInfo = parseUserAgent(
        session.userAgent
      );


      // Check whether this is the current session
      const isCurrent =
        session._id.toString() ===
        currentSessionId.toString();


      return {
        id: session._id,

        device: deviceInfo.device,

        browser: deviceInfo.browser,

        browserVersion: deviceInfo.browserVersion,

        os: deviceInfo.os,

        osVersion: deviceInfo.osVersion,

        location: session.location,

        lastUsedAt: session.lastUsedAt,

        isCurrent,
      };
    });


    // --------------------------------------------------
    // 6. Send response
    // --------------------------------------------------

    return success(
      res,
      200,
      "Active sessions fetched successfully.",
      {
        sessions: formattedSessions,
      }
    );

  } catch (err) {

    console.error(
      "Get Active Sessions Error:",
      err
    );

    return error(
      res,
      500,
      "Unable to fetch active sessions", err.message
    );
  }
}


  







module.exports = { register ,login  , logout, logout_all_devices , rotateToken , verifyEmail ,getUser , getActiveSessions};
