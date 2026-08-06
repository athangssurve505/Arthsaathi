const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { error } = require("../utils/apiResponse.util");

async function authenticate(req, res, next) {
  try {
    const token = req.get("Authorization")?.split(" ")[1];

    if (!token) {
      return error(res, 401, "Access token not found.");
    }

    // Verify and decode the JWT
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Find the authenticated user
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return error(res, 401, "Invalid access token.");
    }

    // Attach user to the request
    req.user = {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    };

    next();
  } catch (err) {
    // Token expired or invalid
    if (
      err.name === "TokenExpiredError" ||
      err.name === "JsonWebTokenError"
    ) {
      return error(res, 401, "Invalid or expired access token.",{
    code: "TOKEN_EXPIRED"
    });}

    return error(
      res,
      500,
      "Something went wrong.",
      err.message
    );
  }
}

module.exports = authenticate