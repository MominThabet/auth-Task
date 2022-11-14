const express = require('express');
const User = require('./model/User');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const path = require('path');
const homeController = require('./controller/home');
mongoose.connect('mongodb://localhost/authTask', {useNewUrlParser: true});

const app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));



app.get('/',homeController);
app.post('/user' , (req,res)=>{
    User.create(req.body,(err,user)=>{
        res.redirect('/users')
    })
})


app.listen(3000)