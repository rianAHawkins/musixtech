// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Post', new Schema({
    name: String,
    image:String,
    date: Date,
    media:String,
    message:String,
    comment:Array,
    vote:Number
}));
