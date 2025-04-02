// get an instance of mongoose and mongoose.Schema
const { Int32 } = require('bson');
var mongoose = require('mongoose');
const { Int } = require('mssql');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const Song = new Schema({
    id: Number,
    author: String,
    Name:String,
    fl:String,
    pic:String
})

module.exports = mongoose.model('Songs', Song)
