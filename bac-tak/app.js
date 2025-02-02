require('dotenv').config();
const cors=require('cors');
const express=require('express');
const databaseConnection=require('./config/databaseConnection.js');
const authroutes=require('./routes/userroutes.js');
const app=express();
databaseConnection();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',authroutes);
module.exports=app;
