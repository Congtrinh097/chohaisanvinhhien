/* eslint-disable no-console */
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
			password: req.payload.password
		};
		return User.findByIdAndUpdate(req.payload.id,data,option);        
	},
	deleleUser: (req) => {
		return User.findOneAndDelete({_id: req.params.id});     
	},
	detailUser: (req) => {
		return User.findOne({_id: req.params.id});
	}, 
	loginAccount: async(req) => {
	
		const {username , password} = req.payload;
		let user = await User.findOne({username: username});
		if (!user) {
			return { code: 404, message: 'User not found!' };
		}else {
			if (user.password == password) {
				return { code: 200, message: 'Login successful!' };
			}else {
				return { code: 404, message: 'Password is not corrected!' };
			}
		}
		
		
	}

};

module.exports = UserController;