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
    }

}

module.exports = UserController;