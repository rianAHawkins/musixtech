var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var express        =         require('express');
var app            =         express();

var httpsPort = 3001;

const https = require('https');
const fs = require('fs');


const options = {
  key: fs.readFileSync('../AnonProject/internal/pem/server-private-key.pem'),
  cert: fs.readFileSync('../AnonProject/internal/pem/server-certificate.pem')
};

//send login page
app.get('/',function(req,res){
    log("Client has connected. sending page:")
    log(__dirname+"/Pages/index.html \n");
    res.sendFile(__dirname+"/Pages/index.html");
});

function random (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

//send random data
app.get('/data',function(req,res){
    log("log:rnd");
    var rNum1=random(1,9),rNum2=random(1,9);
    log("R1 "+rNum1+" R2 "+rNum2);
    res.json({"RN1":rNum1,"RN2":rNum2});
});

function start(){
https.createServer(options, app).listen(httpsPort);
log("HTTPs port Started on https://localhost:"+httpsPort);
}

function log(x){
  console.log(x);
}

start();
