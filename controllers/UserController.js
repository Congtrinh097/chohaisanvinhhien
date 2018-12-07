const User = require('../models/User');

var UserController = {
    getUsers:(rep, res) => {
        return User.find();
    },
    addUsers: (req, res) => {
        const {username, password } = req.payload;
        const user = new User({
            username, 
            password
        });

       return user.save();
    },
    updateUser: (req , res) => {
        let option = { new: true };
        let data = {
           password: req.payload.passwords
        };
        return User.findByIdAndUpdate(req.payload.id,data,option);        
    },
    deleleUser: (req , res) => {
        return User.findOneAndDelete({_id: req.payload.id});     
    },
    detailUser: (req , res) => {
        return User.findOne({_id: req.params.id});
    }

}

module.exports = UserController;