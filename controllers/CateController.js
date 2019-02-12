const Cate = require('../models/Cate');

var CateController = {
	getCates:() => {
		return Cate.find();
	},
	addCate: (req) => {
    
		const {name, description, image  } = req.payload;
		const cate = new Cate({
			name, 
			description,
			image
		});

		return cate.save();
	},
	updateCate: (req) => {
		let option = { new: true };
		let data = {
			name: req.payload.name,
			description:  req.payload.description,
			image:  req.payload.image,
		};
		return Cate.findByIdAndUpdate(req.payload.id,data,option);        
	},
	deleleCate: (req) => {
		return Cate.findOneAndDelete({_id: req.params.id});   
	},
	detailCate: (req) => {
		return Cate.findOne({_id: req.params.id});
	}

};

module.exports = CateController;