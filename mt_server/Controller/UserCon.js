const mongoose = require('mongoose');
var AppModels   = require('./models');
var config      = require('./config'); // get our config file

mongoose.connect(config.database);

var User = AppModels('User');

async function getUser(name) {
    //var x = await User.find({name:name}).exec();
    var x = await User.find({"name":name}).exec();
    console.log(x);
    return x;
}

exports={getUser}