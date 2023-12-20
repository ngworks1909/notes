const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToMongo = () =>{
    mongoose.connect(process.env.CONNECT).then(()=>{
        console.log("Connected to database...");
    });
}

module.exports = connectToMongo; 