const userRouter = require("express").Router();

const authenticate = require("../middlewares/auth.middleware");
const {changePasswordSchema} = require("../validation/auth.validation")
const validate = require("../middlewares/validate.middleware");
const changePassword = require("../controllers/user.controller")



// Change password route - take user current password compares it with previous password if both match current password is replaced by new password else error is been send back to user 


userRouter.use(authenticate);
userRouter.post("/change-password",validate(changePasswordSchema),changePassword);


module.exports = userRouter