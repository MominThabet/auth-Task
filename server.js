const express        = require('express');
const cors           = require('cors');

const User           = require('./app/models/user.model');

const mongoose       = require('mongoose');
// const path           = require('path');
const homeController = require('./app/controller/home');



const app = express();

app.use(cors({origin :"http://localhost:8081"}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const db = require('./app/models');
const dbConfig = require('./app/config/db.config');
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}` ,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("Successfully connect to mongoDB");
    })
    .catch((err)=>{
        console.error("Connection Error:" ,err);
        process.exit()
    })




app.get('/',homeController);

app.post('/user' , (req,res)=>{
    User.create(req.body,(err,user)=>{
        res.redirect('/users');
    });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080 ;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});