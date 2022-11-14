const User = require('../model/User');

module.exports = async (req,res)=>{
    const users = await User.find({});
    res.json(users);
}