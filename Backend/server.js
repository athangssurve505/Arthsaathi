require("dotenv").config();
const connectToDatabase = require("./src/config/database.config");

const app = require("./src/app");

 connectToDatabase();

app.listen(process.env.PORT,()=>{
    console.log("Server is running");
})