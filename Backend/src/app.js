const express = require("express");
const cors = require("cors");


const authRouter = require("./routes/auth.route")
const userRouter = require("./routes/user.route")
const cookieParser = require("cookie-parser")

const app = express();

// Middlewares
app.use(cors({
     origin: "http://localhost:5173",
     credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/",authRouter);
app.use("/api/user/",userRouter);

module.exports = app