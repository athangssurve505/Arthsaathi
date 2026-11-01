const express = require("express");
const cors = require("cors");


const authRouter = require("./routes/auth.route")
const userRouter = require("./routes/user.route")
const cookieParser = require("cookie-parser")

const app = express();

// Middlewares
app.use(cors({
     origin: process.env.CLIENT_URL,
     credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/",authRouter);
app.use("/api/user/",userRouter);

module.exports = app