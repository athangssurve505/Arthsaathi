const mongoose = require("mongoose");

async function connectToDatabase(){
    try{
    await mongoose.connect(`${process.env.MONGODB_URI}arthsatthi`);
    console.log("Connected to Database");
    }catch(err)
    {console.log(err.message)}
}

module.exports = connectToDatabase;