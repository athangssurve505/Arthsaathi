/**
 * Send a standardized success response.
 *
 * @param {import("express").Response} res
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {Object} data - Additional response data
 */
function success(res, statusCode, message, data = null) {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data && { data }),
  });
}


/**
 * Send a standardized error response.
 *
 * @param {import("express").Response} res
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {Object} errors - Additional error details (optional)
 */
function error(res, statusCode, message, errors = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
}

module.exports = {
  success,
  error,
};