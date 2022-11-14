const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type : String,
        required: [true,'Please provide username'],
        unique : true
    },
    email : {
        type : String ,
        required : [true , 'Pls provide email'],
        unique : true
    },
    password : {
        type : String,
        required: [true,'Please provide password']
    }
});

UserSchema.pre('save',function(next){
    const user = this;
    bcrypt.hash(user.password,10,(error,hash)=>{
        user.password = hash;
        next();
    }) 
})

const User = mongoose.model('User',UserSchema) ;
module.exports = User ;