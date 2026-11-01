const authRouter = require("express").Router();

const {registerSchema, loginSchema} = require("../validation/auth.validation")
const validate = require("../middlewares/validate.middleware");
const authenticate = require("../middlewares/auth.middleware")

const {register, login , logout, logout_all_devices, rotateToken, verifyEmail, getUser, getActiveSessions} = require("../controllers/auth.controller")


authRouter.post("/register",validate(registerSchema),register);
authRouter.post("/login",validate(loginSchema),login)
authRouter.get("/logout",logout);
authRouter.get("/rotateToken", rotateToken);
authRouter.post("/verify-email",verifyEmail);
authRouter.get("/me",authenticate,getUser);
authRouter.get("/sessions",authenticate,getActiveSessions);


module.exports = authRouter