const Product = require('../models/Product');

var ProductController = {
	getProducts:() => {
		return Product.find();
	},
	addProduct: (req) => {
    
		const {
			code, 
			name,
			description,
			cover_image,
			images,
			price,
			old_price 
		} = req.payload;
		const product = new Product({
			code, 
			name,
			description,
			cover_image,
			images,
			price,
			old_price

		});
	
		return product.save();
	},
	updateProduct: (req) => {
		let option = { new: true };
		const {
			code, 
			name,
			description,
			cover_image,
			images,
			price,
			old_price 
		} = req.payload;

		let data = {
			code, 
			name,
			description,
			cover_image,
			images,
			price,
			old_price
		};
		return Product.findByIdAndUpdate(req.payload.id,data,option);        
	},
	deleleProduct: (req) => {
		return Product.findOneAndDelete({_id: req.params.id});   
	},
	detailProduct: (req) => {
		return Product.findOne({_id: req.params.id});
	}

};

module.exports = ProductController;