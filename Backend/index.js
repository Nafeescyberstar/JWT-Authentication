require('dotenv').config();
let cors = require("cors");

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error',(error) => {
    console.log(error)
})
database.once('connected',() =>{
    console.log("Database connected successfully");
})

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
app.use('',routes);
app.listen(4000,()=>{
    console.log(`Server started at ${4000}`)
})