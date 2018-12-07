const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const UserScheme = new Schema({
    username: String,
    password: String,
});

module.exports = mongosee.model('User', UserScheme);