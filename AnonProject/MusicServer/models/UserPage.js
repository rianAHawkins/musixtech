// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('UserPage', new Schema({
    name: String,
    age:Number,
    banner:String,
    bio:String,
    image:String,
    pin:Number
}));
