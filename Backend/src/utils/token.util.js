const jwt = require("jsonwebtoken");
const ms = require("ms");

/**
 * Generate Access Token
 */
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

/**
 * Generate Refresh Token
 */
const generateRefreshToken = (sessionId) => {
    return jwt.sign(
        {
            sessionId,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};


const getRefreshTokenExpiryDate = () => {
    return new Date(
        Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRY)
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    getRefreshTokenExpiryDate
};