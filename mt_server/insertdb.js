//require node modules (see package.json)
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    var insert = false;
    var assert = require('assert');
    var songid=22
    ,author="Kendrick Lamar"
    ,Name="Rigamortis"
    ,fL="Kendrick Lamar-Rigamortis.mp3"
    ,pic="kdot.png";

function inserts(){
//connect away
MongoClient.connect('mongodb://127.0.0.1:27017/users', function(err, db)
{
  if (err) throw err;
  console.log("Connected to Database");

      // Get the documents collection
      var Ucollection = db.collection('Songs');

      //Create some users
      var Song1 = {Songid:songid,Author:author,name:Name,fl:fL,pic:pic};

      // Insert some songs
      Ucollection.insert([Song1], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        }
        db.close();
      });
   });
}

function showdb(){
  MongoClient.connect('mongodb://127.0.0.1:27017/users', function(err, db){
    //db.collection('Songs').remove({Author:'Jcole'},{justOne:true})
    var cursor =db.collection('Songs').find().sort({Songid:1})
    var stop=0;
    cursor.each(function(err, doc) {
       assert.equal(err, null);
       if (doc != null) {
          console.log(doc);
          stop++;
       } else {

       }

  });

});}

if(insert){
  inserts();
}else {
  showdb();
}
