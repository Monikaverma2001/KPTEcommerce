const express= require("express");
const mongoose=require('mongoose');
const app=express();

/* raizorpay code */

// const db=require("./config/config")

require('dotenv').config();

var cookieParser = require('cookie-parser')


async function databaseconnect()
{
    try{
        await mongoose.connect(process.env.murl);
        console.log("connected")
    }
    catch(err){
        console.log(err)
    }
}

databaseconnect();
/*
const route=reqire(routerpath)
app.use(path,route)
*/
const route=require('./routes/index')
app.use(express.json())
app.use(cookieParser());
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));





//fetching products from the database
app.use('/',route)




app.listen(4000,()=>console.log("working"))