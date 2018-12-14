const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const CateScheme = new Schema({
	name: String,
	description: String,
	image: String
});


module.exports = mongosee.model('Cate', CateScheme);