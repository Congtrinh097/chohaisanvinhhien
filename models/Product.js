const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const ProductScheme = new Schema({
    code: String,
    name: String,
    description: String,
    cover_image: String,
    images: [String],
    price: Number,
    old_price: Number
});

module.exports = mongosee.model('Product', ProductScheme);