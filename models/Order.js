const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const OrderScheme = new Schema({
	customer_id: String,
	status_code: String,
	total: Number,
	payment_type: String,
	dilivery_date: Date,
	order_date: Date,
	dilivery_address: String
});

module.exports = mongosee.model('Order', OrderScheme);