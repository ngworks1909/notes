const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
//connected to mongo
const app = express();
const port = 3001;
app.use(cors())
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.get("/",(req,res)=>{
    res.send("Hello");
})

app.listen(port,()=>{
    console.log(`Connected to localhost on port ${port}`);
})