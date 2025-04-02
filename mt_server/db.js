const mongoose = require('mongoose');
var AppModels   = require('./models');
var config      = require('./config'); // get our config file

mongoose.connect(config.database);

var User = AppModels('User');
var Song = AppModels('Songs')

var insert = false;

var songid=2
    ,author="Kendrick Lamar"
    ,Name="Rigamortis"
    ,fL="Kendrick Lamar-Rigamortis.mp3"
    ,pic="kdot.png";

// var Fresh = new User({
//     name: "DOOM",
//     password: "1WXzJ1/9rcdcIrw3vbrvV7PqesMtJc9kg/NG02hr",
//     gmail:"rianandrewwhite@gmail.com",
//     role:"User",
//     token:""
//   });

// var res = Fresh.save();
// console.log("{/n"+res+"/n}");
async function insertF(){
    var Fresh = new Song({
        id:songid,
        author:author,
        Name:Name,
        fl:fL,
        pic:pic
    });
    await Fresh.save();
    console.log("ADDED!");
}


async function getUser(name) {
    //var x = await User.find({name:name}).exec();
    var x = await User.find().exec();
    console.log(x);
}

async function getSong() {
    //var x = await User.find({name:name}).exec();
    var x = await Song.findOne({id:1}).exec();
    console.log(x);
}


if(!insert){
    //getUser("DOOM");
    getSong();
}
else{
    insertF();
}