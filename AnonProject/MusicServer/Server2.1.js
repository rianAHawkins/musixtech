

//*********************var delc********************************
    var http = require('http'),
    fileSystem = require('fs'),
    path = require('path')
    util = require('util'),
    songs = {},
    songsN={},
    fs = require('fs'),
    count = 0,
    sont=0,
    port=3001;

    var express        =         require('express');
    var app            =         express();
    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    var assert = require('assert');
    var ObjectId = require('mongodb').ObjectID;
    var Uurl = 'mongodb://127.0.0.1:27017/users';
//*********************var delc********************************

start();

app.get('/song',function(req,res)
{
  try{
  song = req.query.id;
  //Song file path
  GetSongByIndex(song,function(x)
  {
      filePath= __dirname+'/Songs/'+x;
      var stat = fileSystem.statSync(filePath);
      res.writeHead(200,
      {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size,
      'Accept-Ranges':'bytes',
      'Content-Range':0-stat.size/stat.size
      });
      var readStream = fileSystem.createReadStream(filePath);
      // We replaced all the event handlers with a simple call to util.pump()
      readStream.pipe(res);
  },'mp3');
}catch(A){
  log("Error line#47");
}
});

app.get('/songName',function(req,res){
  try{
  song = req.query.id;
  //Song file path
  GetSongByIndex(song,function(x)
  {
    log("to client: "+x)
    res.send(x);
  },'name');
  }catch(A){
  log("Error line#61");
  }
});

app.get('/coverArt',function(req,res){
  try{
  song = req.query.id;
  //Song file path
  GetSongByIndex(song,function(x)
  {
    filePath= __dirname+'/Album/'+x;
    log(filePath);
    var img = fs.readFileSync(filePath);
     res.writeHead(200, {'Content-Type': 'image/gif' });
     res.end(img, 'binary');
  },'art');
  }catch(A){
  log("Error line#61");
  }
})

app.get('/listSongs',function(req,res)
{
  log("got request");
  var song = req.query.id;
  song=song-1;
  var once = false;
  GetList(song,function(doc){
    if(!once)
    {
      log("Sending 10 more from "+song+"....");
      log(doc);
      res.send(doc);
      log("Sent!!");
      once=true;
    }
  });
});

function GetList(song,cb){
MongoClient.connect(Uurl, function(err, db){
  //db.collection('Songs').remove({Songid:3},{justOne:true})
  var cursor =db.collection('song').find({ Songid: { $gt: song } }).sort({Songid:1})
  var strSongs={};
  var x=0;
  cursor.each(function(err, doc) {
     assert.equal(err, null);
     if (doc != null && x<10)
       {
        strSongs[x]=doc;
       }
       else
       {
          cb(strSongs);
       }
        x=x+1;
});
db.close();
});
}

app.get('/',function(req,res)
{
  res.sendFile(__dirname+'/Home.html')
});

//loggin submit
app.get('/login',function(req,res)
{
  var user_name=req.query.user;
  var password=req.query.password;
  log("User name is "+user_name+", password is "+password);

  var Session=null;
  //database connection
  MongoClient.connect(Uurl, function(err, db)
  {
    if (err) throw err;//if there is an error report it
        log("Connected to Database");
        assert.equal(null, err);
        findUsers(db, function(ans)//callback function
        {
            if(ans != "Done")
            {
              log("Found")
              log(ans);
            res.send(ans);
            }else
            {
                log("not found");
                res.send("false");
            }
            db.close();
        },user_name,password);//only return modulus user
  });
});

//find if user name and password is in the database
var findUsers = function(db, callback,name,password)
{
   var cursor =db.collection('user').find({ "name": name,"password":password});
   var stop=0;
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         callback(doc);
         stop++;
      } else {
        if(stop==0)
        {
         callback("Done");
       }
      }
   });
};

var GetSong = function(db, callback,id)
{
  id=id*1;
   var cursor =db.collection('song').find({ "Songid":id});
   var stop=0;
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         callback(doc);
         stop++;
      } else {
        if(stop==0)
        {
         callback("Found Nothing");
       }
      }
   });
};

function GetSongByIndex(x,ret,from)
{
  MongoClient.connect(Uurl, function(err, db)
    {
      if (err) throw err;//if there is an error report it
          log("Connected to Database");
          assert.equal(null, err);
          GetSong(db, function(ans)//callback function
          {
              if(ans != "Found Nothing")
              {
                if(from=='mp3'){
                  log(ans.Author+" : "+ ans.name);
                  ret(ans.fl);
                }else if(from=='name'){
                  //ret("{Auth:"+ans.Author+",name:"+ ans.name+"}");
                  ret(ans);
                }
                else if(from=='art')
                {
                  ret(ans.pic);
                }
              }
              db.close();
          },x);//only return modulus user
    });
}

//index of function
function indOf(x,y)
{
  var s=0,r=-1;
  while(s<x.length)
  {
    if(x[s]==y)
    {
      r=s;
      s=x.length;
    }
    s=s+1;
  }
  return r;
}

//sort log function
function log(x)
{
  console.log(x);
}

app.post('/signUp',function(req,res)
{
    log("hello");
    var user_name=req.query.user;
    var password=req.query.password;
    var age=req.query.age;
    log("User name is "+user_name+", password is "+password+", age is "+age);
    MongoClient.connect(Uurl,function(err,db)
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
var SaveUsers = function(db, callback,name,password,age)
{
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

function start()
{
  http.createServer(app).listen(port);
  log("Started on port "+port);
}
