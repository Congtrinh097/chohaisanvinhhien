const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const OrderItemSchema = Schema({
    order_id: String,
    product_id: String,
    quantity: Number
});

module.exports = mongosee.model("OrderItem", OrderItemSchema)