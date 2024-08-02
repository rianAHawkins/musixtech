// =======================
// get the packages we need
// =======================
var express     = require('express');
var app         = express();
var apps        = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt         = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config      = require('./config'); // get our config file
var AppModels   = require('./models');//user'); // get our mongoose model
var path        = require('path');
var util        = require('util');
var fs          = require('fs');
var nodemailer  = require('nodemailer');
var mobile      = require('is-mobile');
var child_process = require('child_process');
var {encrypt,decrypt} = require('./EOD');

// =======================
// === configuration =====
// =======================

var songs = {},songsN={},
count = 0,sont=0;
var httpsPort = 8080;
var port = 82; // used to create, sign, and verify tokens
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

var MongoClient;// require('mongodb').MongoClient
var format = require('util').format;
var assert = require('assert');
const { STATUS_CODES } = require('http');
var ObjectId = require('mongodb').ObjectID;
var Uurl = 'mongodb://127.0.0.1:27019/users';


const options = {
  key: fs.readFileSync('internal/pem/server-private-key.pem'),
  cert: fs.readFileSync('internal/pem/server-certificate.pem')
};


// =======================
// ===== routes ==========
// =======================


app.use(function(req, res, next) {
  //Access-Control-Allow-Origin: *
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// basic route
app.get('/', function(req, res)
{
    res.send("YEAH IM AN API");
    // var ismobile = mobile(req);
    // if(ismobile)
    // {
    //   console.log("mobile");
    //   res.sendFile(__dirname+'/pages/mMusixTech.html');
    // }
    // else
    // {
    //   console.log("desktop");
    //   res.sendFile(__dirname+'/pages/MusixTech.html');
    // }
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

app.get('/valerie',function(req, res)
{
  res.sendFile(__dirname+'/pages/valerie.html');
});

app.get('/game',function(req, res)
{
  var ismobile = mobile(req);
  if(ismobile)
  {
    console.log("mobile");
    res.sendFile(__dirname+'/pages/mapps.html');
  }
  else
  {
    console.log("desktop");
    res.sendFile(__dirname+'/pages/apps.html');
  }

});

app.get('/software',function(req, res)
{
  var ismobile = mobile(req);
  if(ismobile)
  {
    console.log("mobile");
    res.sendFile(__dirname+'/pages/msoftware.html');
  }
  else
  {
    console.log("desktop");
    res.sendFile(__dirname+'/pages/software.html');
  }
});

app.post('/software',function(req,res)
{
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'generalappmail@gmail.com',
      pass: 'Whiteandrewrian15'
    }
  });

  var mailOptions = {
    from: 'generalappmail@gmail.com',
    to: 'rianandrewwhite@gmail.com',
    subject: 'Project Lead',
    text: 'Name: '+ req.body.name+'\n'+
          'Number: '+ req.body.number+'\n'+
          'Email: '+ req.body.email+'\n'+
          'Details:\n'+ req.body.details
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.sendFile(__dirname+'/pages/STY.html');
});

app.get('/portfolio',function(req, res)
{
  var ismobile = mobile(req);
  if(ismobile)
  {
    console.log("mobile");
    res.sendFile(__dirname+'/pages/mport.html');
  }
  else
  {
    console.log("desktop");
    res.sendFile(__dirname+'/pages/port.html');
  }
});

app.get('/about',function(req, res)
{
  var ismobile = mobile(req);
  if(ismobile)
  {
    console.log("mobile");
    res.sendFile(__dirname+'/pages/mabout.html');
  }
  else
  {
    console.log("desktop");
    res.sendFile(__dirname+'/pages/about.html');
  }
});

//signup page for browser
app.get('/signUp', function(req,res)
{
  //returns signup page
  var ismobile = mobile(req);
  if(ismobile)
  {
    console.log("mobile");
    res.sendFile(__dirname+'/pages/mSignup.html');
  }
  else
  {
    console.log("desktop");
    res.sendFile(__dirname+'/pages/SignUp.html');
  }
});

//api signup
app.post('/signup', function(req,res)
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
        var passing = encrypt(req.body.password);
        var Fresh = new User({
          name: req.body.name,
          password: passing,
          admin: false
        });

        // save the sample user
        Fresh.save(function(err) {
            if (err) throw err;
            console.log('User saved successfully');
            var userpage = new UserPage({
              name:Fresh.name,
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

app.get('/update', function(req,res){
  res.sendFile(__dirname+'/pages/Update.html');
});

var zem = false;
app.post('/update', function(req,res){
  //run bat file
  console.log("Am updating here...");
  process.exit();
  //res.json({ success: true, message: 'Server is updating'});
});

app.get('/HB', function(req, res)
{
    res.status(200).json({msg:"Welcome to the api"});
    //res.send('Hello! The API is at https://localhost:' + httpsPort + '/api');
});

//======================================
//========= MUSIC Server @mapi==========
//======================================

// get an instance of the router for api routes
var music = express.Router();

// apply the routes to our application with the prefix /api
app.use('/mapi', music);

music.get('/',function(req,res)
{
  res.json({ message: 'The API to rule them all : This is the musixtech app api' });
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
      var passing = decrypt(user.password);
      var tpass = req.body.password;//deUser(req.body.password);
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
        var stat = fs.statSync(filePath);
        res.writeHead(200,
        {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size,
        'Accept-Ranges':'bytes',
        'Content-Range':0-stat.size/stat.size
        });
        var readStream = fs.createReadStream(filePath);
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
  MongoClient.connect('mongodb://127.0.0.1:27018/users', function(err, db)
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

function makeConnection(){
  MongoClient = require('mongodb').MongoClient;
  mongoose.connect(config.database); // connect to database
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
  app.listen(httpsPort);
  log('HTTP port Started on http://localhost:' + httpsPort);

  //https.createServer(options, apps).listen(httpsPort);
  //log("HTTPs port Started on https://localhost:"+httpsPort);
}

//console log replacment
function log(x)
{
  console.log(x);
}

start();
