// =======================
// get the packages we need
// =======================
var express     = require('express');
var app         = express();
var apps        = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var multer      = require('multer');
var jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config      = require('./config'); // get our config file
var AppModels   = require('./models');//user'); // get our mongoose model
var fileSystem  = require('fs');
var path        = require('path');
var util        = require('util');
var fs          = require('fs');

// =======================
// === configuration =====
// =======================

var songs = {},songsN={},
count = 0,sont=0;
var httpsPort = 8081;
var port = 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable
apps.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
apps.use(bodyParser.urlencoded({ extended: false }));
apps.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
apps.use(morgan('dev'));

const https = require('https');

var MongoClient = require('mongodb').MongoClient
, format = require('util').format;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var Uurl = 'mongodb://127.0.0.1:27017/users';


const options = {
  key: fs.readFileSync('../AnonProject/internal/pem/server-private-key.pem'),
  cert: fs.readFileSync('../AnonProject/internal/pem/server-certificate.pem')
};


// =======================
// ===== routes ==========
// =======================
// basic route
app.get('/', function(req, res)
{
    res.sendFile(__dirname+'/pages/MusixTech.html');
});

app.get('/g',function(req, res)
{
  res.sendFile(__dirname+'/res/gaming.jpg');
});
app.get('/s',function(req, res)
{
  res.sendFile(__dirname+'/res/software.jpg');
});
app.get('/p',function(req, res)
{
  res.sendFile(__dirname+'/res/port.jpg');
});
app.get('/a',function(req, res)
{
  res.sendFile(__dirname+'/res/about.jpg');
});

app.get('/game',function(req, res)
{
  res.send("This is all the games I made (if I had any)");
});

app.get('/software',function(req, res)
{
  res.sendFile(__dirname+'/pages/software.html');
});

app.get('/portfolio',function(req, res)
{
  res.send("This is the portfolio page");
});

app.get('/about',function(req, res)
{
  res.send("This is the about us page");
});

//signup page for browser
app.get('/signUp', function(req,res)
{
  //returns signup page
});

//signup call
app.post('/psignup', function(req,res)
{
    // find the user
    // User
    var User = AppModels('User');
    var UserPage = AppModels('UserPage');
    User.findOne({
      name: req.body.name
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        //then get password and add to database
        // create a sample user
        var nickname = getNick();
        var passing = pepper(req.body.password,nickname);
        var nick = new User({
          name: req.body.name,
          password: passing,
          admin: false,
          nick:nickname
        });

        // save the sample user
        nick.save(function(err) {
            if (err) throw err;
            console.log('User saved successfully');
            var userpage = new UserPage({
              name:nick.name,
              age:1,
              banner:"",
              bio:"This is yo bio",
              image:"",
              pin:-1
            });
            userpage.save(function(err) {
              if (err) throw err;
              console.log('User page saved successfully');
              res.json({ success: true, message: 'User not found. can use'});
          });
        });
      } else if (user) {
        res.json({success:false, message:'Great minds think alike: usename is in use'});
      }
    });
});

apps.get('/', function(req, res)
{
    res.sendFile("Welcome to the api");
    //res.send('Hello! The API is at https://localhost:' + httpsPort + '/api');
});

//======================================
//== commons voice Server @cvapi=========
//======================================

// get an instance of the router for api routes
var cv = express.Router();
// apply the routes to our application with the prefix /api
app.use('/cvapi', cv);

cv.get('/',function(req,res)
{
  res.sendFile(__dirname+'/pages/index.html')
});

cv.post('/post',function(req,res){
  var meta=
  [req.body.username,
  req.body.city,
  req.body.address,
  req.body.image,
  req.body.comment];
  //add to Database

});

cv.get('/posts',function(req,res){
  //return compaints from city
  var meta=req.body.city;
});

cv.post('/post',function(req,res){
  var meta=[2,3,4];

});

//======================================

//======================================
//== Social Network Server @api=========
//======================================

// get an instance of the router for api routes
var apiRoutes = express.Router();

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res)
{

  // User
  var User = AppModels('User');
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      var passing = depep(user.password,user.nick);
      var tpass = req.bpdy.password;//deUser(req.body.password);
      //log("username: "+user.name+"\npass: "+passing+' , '+tpass+"\nlen:"+passing.length+"..."+tpass.length);
      if (passing != tpass) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
    const payload = {
      admin: user.admin
    };
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn:900
          //expiresInMinutes: 1440 // expires in 24 hours
        });

        //update token of user
        user.token=token;
        user.save(function(err) {
            if (err) throw err;
            console.log('User saved successfully');
          });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          nuser:user.name,
          friends:user.friends,
          noti:user.noti
        });
      }
    }
  });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next)
{

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res)
{
  res.json({ message: 'The API to rule them all' });
});

//return the delete page for website
apiRoutes.get('/delete', function(req,res){

});

// route to delete the user
apiRoutes.post('/pdelete', function(req, res)
{
  // User
  var User = AppModels('User');
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // check if password matches
      var passing = depep(user.password,user.nick);
      var puser = req.bpdy.password;//deUser(req.body.password);
      if (passing != puser) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // see if token is right
        var token =req.body.token || req.query.token || req.headers['x-access-token'];
        if(user.token == token)
        {
          User.remove(
          {
            name: req.body.name,
            password: user.password
          },
          function(err)
          {
            if (err)throw err;
            res.json({ success: true });
          })
        }
      }
    }
  });
});

//route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req,res)
{
  // User
  var User = AppModels('User');
  User.find({}, function(err, users) {
    res.json({name:users.name,admin:user.admin});
  });
});

//request to add friend
apiRoutes.post('/requestFriend',function(req,res){

});

//confirm the friend
apiRoutes.post('/confirmFriend',function(req,res){

});

//remove friend
apiRoutes.post('/removeFriend',function(req,res){

});

//used to edit the notification array
apiRoutes.post('/updatenoti',function (req,res){

});

//load the post
apiRoutes.get('/gpost',function(req,res){

  var User = AppModels('User');
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user)
    {

      var post = AppModels('Post');
      //db.collection('Songs').find({ Songid: { $gt: song } }).sort({Songid:1})

      var postings={},lpost=req.friends;
      for(var x=0;x<lpost.friends.length;x++){
        /*
        //should be saying get post of friends
        //Where dates is older than current time
        //and or last seen post from that user
        */
        postings[x]=post.find({name:lpost.friends[x],date:{lte:lpost.dates[x]}})
        .sort({date:-1}).limit(10);
      }
      log(postings);
      res.send(postings);
    }
  });
});

//make a post
apiRoutes.post('/ppost',function(req,res){
  var post = AppModels('Post');

});

//route to update UserPage
apiRoutes.get('/userpage', function(req,res)
{
  // User
  var UserPage = AppModels('UserPage');
  UserPage.findOne(
    {
      name: req.body.name
    },
  function(err, user)
  {
    if (err) throw err;

    if (!user)
    {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    else if (user)
    {
      //send all the userpage info
      res.json(user);
    }
  });
});

//route to edit the user page
apiRoutes.post('/euserpage', function(req,res)
{
  var UserPage = AppModels('UserPage');
  UserPage.findOne({
    name: req.body.name
  },
  function(err, user)
  {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    else if (user)
    {
      user.age=req.body.age;
      user.bio=req.body.bio;
      // Uploaded files:
      var banner =req.files.banner||null;
      var bioI =req.files.bio||null;


      if (banner!=null)
      {
        //send all the userpage info
        var bloc ="./"+user.name+"/images/banner.jpg";
        saveFile(banner,bloc);
        user.banner = bloc;
        log("banner updated");
      }
      if(bioI!=null)
      {
        user.pin=user.pin+1;
        var loc = "./"+user.name+"/images/bio/pic"+user.pin+".jpg";
        user.image = loc;
        saveFile(bioI,loc);
        log("Bio image updated")
      }
      User.save(function(err) {
        if (err) throw err;
        console.log('User page saved successfully');
        res.json({ success: true, message: 'user page update was successfull'});
    });

      res.json({success:true,message:"update was good fammy"});
    }
  });
});

//Test update
apiRoutes.get('/password', function(req,res)
{
  var User = AppModels('User');
  User.find({}, function(err, users) {
    user.password = req.body.passing;
    res.json(users);
  });
});

//decode
function depep(str1,str2)
{
  var save="";
  var c1=0,c2=0;x=0;
  while(x<30)
  {
      var num = (str1.charCodeAt(c1)-x);
      if(!(num== str2.charCodeAt(c2))){
        num +=str2.charCodeAt(c2);
        save+=String.fromCharCode(num);
      }
      //console.log("num:"+num+" test:"+test);
      if(c2>=str2.length){c2=0}
      else{c2+=1;}
      c1+=1;

      x+=1;
  }
  save = save.substr(0,passing.length-1);
  return save;
}

function deUser(str1)
{
  var save="",x=0,p=3;
  while(x<str1.length)
  {
    var num =str1.charCodeAt(x)-p;
    save+= String.fromCharCode(num);
    x+=1;p+=3;
  }
}

function getNick()
{
  var save='';
  for(var x=0;x<20;x++){
    var num =getRandomArbitrary(97, 122);
    save+=String.fromCharCode(num)
  }
  return save;
}

//nickGen
function getRandomArbitrary(min, max)
{
  return Math.random() * (max - min) + min;
}

//encode
function pepper(str1,str2)
{
  var save="";
  var c1=0,c2=0,x=0;
  while(x<30)
  {
    var num;
    if(c1<str1.length){
      num = (str1.charCodeAt(c1)-str2.charCodeAt(c2))+save.length;
    }else{
      num = str2.charCodeAt(c2)+save.length;
    }
      save+=String.fromCharCode(num);
      if(c2>=str2.length){c2=0}
      else{c2+=1;}
      c1+=1;
      x+=1;
  }
  return save;
}

// File Storage
function saveFile(file,location)
{
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.banner;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);
  });
}
//======================================

//======================================
//========= MUSIC Server @mapi==========
//======================================

// get an instance of the router for api routes
var music = express.Router();
// apply the routes to our application with the prefix /api
app.use('/mapi', music);

music.get('/',function(req,res)
{
  res.sendFile(__dirname+'/pages/index.html')
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
music.post('/authenticate', function(req, res)
{

  // User
  var User = AppModels('User');
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      var passing = depep(user.password,user.nick);
      var tpass = req.bpdy.password;//deUser(req.body.password);
      //log("username: "+user.name+"\npass: "+passing+' , '+tpass+"\nlen:"+passing.length+"..."+tpass.length);
      if (passing != tpass) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
    const payload = {
      admin: user.admin
    };
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn:900
          //expiresInMinutes: 1440 // expires in 24 hours
        });

        //update token of user
        user.token=token;
        user.save(function(err) {
            if (err) throw err;
            console.log('User saved successfully');
          });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          nuser:user.name,
          friends:user.friends,
          noti:user.noti
        });
      }
    }
  });
});

music.get('/coverArt',function(req,res)
{
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

music.get('/listSongs',function(req,res)
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

//loggin submit
music.get('/login',function(req,res)
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

// route middleware to verify a token
music.use(function(req, res, next)
{

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});


music.post('/signUp',function(req,res)
{
    log("hello");
    var user_name=req.query.user;
    var password=req.query.password;
    var age=req.query.age;
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

music.get('/song',function(req,res)
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
  }catch(A)
  {
    log("Error line#47");
  }
});

music.get('/songName',function(req,res)
{
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

function GetList(song,cb)
{
  MongoClient.connect('mongodb://127.0.0.1:27017/users', function(err, db)
  {
    //db.collection('Songs').remove({Songid:3},{justOne:true})
    var cursor =db.collection('Songs').find({ Songid: { $gt: song } }).sort({Songid:1})
    var strSongs={};
    var x=0;
    cursor.each(function(err, doc)
    {
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
  });
}

var GetSong = function(db, callback,id)
{
  id=id*1;
   var cursor =db.collection('Songs').find({ "Songid":id});
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

//return song
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

//=========================================

// ============================
// ==== start the server ======
// ============================

//server start up
function start()
{
  app.listen(port);
  log('HTTP port Started on http://localhost:' + port);

  https.createServer(options, apps).listen(httpsPort);
  log("HTTPs port Started on https://localhost:"+httpsPort);
}

//console log replacment
function log(x)
{
  console.log(x);
}

start();
