const express=require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose=require('mongoose');
const dotenv=require('dotenv').config()

const app=express()
let port=process.env.PORT || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Suman-1432:Suman1432@cluster0.bkkfmpr.mongodb.net/Design_Db", {
    useNewUrlParser: true
})
.then(() => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/',route)

app.listen(port,(err)=>{
console.log(`app is listening on ${port}`)
})