var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
var port=3001;

var user_name="";
var password="";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//send login page
app.get('/',function(req,res){
    log(__dirname+"/Pages/index.html");
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

app.get('/users',function(req,res){
  return 1;
});

//loggin submit
app.post('/login',function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;
  log("User name is "+user_name+", password is "+password);

  var Session=null;
  //database connection
  MongoClient.connect(url, function(err, db)
  {
    if (err) throw err;//if there is an error report it
        log("Connected to Database");
        assert.equal(null, err);
        findUsers(db, function(ans)//callback function
        {
            if(ans != "Done")
            {
            log(ans);
            return ans;
            }else
            {
                log(ans);
            }
            log("done");
            db.close();
        },user_name,password);//only return modulus user
  });
});

//find if user name and password is in the database
var findUsers = function(db, callback,name,password) {
   var cursor =db.collection('users').find({ "name": name,"password":password});
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         callback(doc)
      } else {
         callback("Done");
      }
   });
};

app.get('/signUP',function(req,res){
    res.sendfile(__dirname+"/Pages/Update.html");
});

app.post('/signUp',function(req,res){
    log("hello");
    var user_name=req.body.user;
    var password=req.body.password;
    var age=req.body.age;
    log("User name is "+user_name+", password is "+password+", age is "+age);
    MongoClient.connect(url,function(err,db)
    {
        if (err) throw err;
        log("Connected to Database");
        SaveUsers(db,function(ans){
            log(ans);
            db.close();
        },user_name,password,age);
    });
});

//find if user name and password is in the database
var SaveUsers = function(db, callback,name,password,age) {
   var collection = db.collection('users');
    var user1 = {name: name,password:password, age: age, roles: ['basic','lost','newaccount']};
    collection.insert([user1] ,function(err, result) {
      if (err) {
        log(err);
      } else {
        log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
      callback("done");
    });
};

//quick log function because i hate console.log()
var log = function(x){
    console.log(x);
};


//start listening
app.listen(port,function(){
  log("Started on PORT 3001");
});
