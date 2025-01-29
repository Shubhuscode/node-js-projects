//model/model.js code..
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const userSchema = new Schema({
    name: String,
    age: Number
});

const Userdb = mongoose.model('User', userSchema);

module.exports = Userdb;
