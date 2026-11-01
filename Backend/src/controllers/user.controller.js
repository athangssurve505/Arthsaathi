const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { error, success } = require("../utils/apiResponse.util");

async function changePassword(req, res) {
  // Get passwords from the validated request body
  const { currentPassword, newPassword } = req.body;

  // Find the authenticated user
  const user = await userModel.findById(req.user.id);

  // Check if user exists
  if (!user) return error(res,404, "User not Found",{
    user:req.user
  });

  // Verify that the current password is correct
  const isValidPassword = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isValidPassword) {
    return error(res,401, "Invalid current password");
  }

  // Hash the new password before storing it
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password
  user.password = hashedPassword;

  // Save the updated user
  await user.save();

  // Return success response
  return success(res,200, "Password Changed Successfully");
}

module.exports = changePassword;