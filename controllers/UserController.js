const User = require('../models/User');

var UserController = {
	getUsers:() => {
		return User.find();
	},
	addUsers: (req) => {
		const {username, password } = req.payload;
		const user = new User({
			username, 
			password
		});

		return user.save();
	},
	updateUser: (req) => {
		let option = { new: true };
		let data = {
			password: req.payload.passwords
		};
		return User.findByIdAndUpdate(req.payload.id,data,option);        
	},
	deleleUser: (req) => {
		return User.findOneAndDelete({_id: req.payload.id});     
	},
	detailUser: (req) => {
		return User.findOne({_id: req.params.id});
	}

};

module.exports = UserController;