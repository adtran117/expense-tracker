/**
 *  This file is a standalone script to populate and test the database.
 *
 *  To use this script, run this:
 *
 *    node ./seed.js
 *  
 *  Data populated will be from `data.json`.
 */

var db = require('./src/server/db/config');
var User = require('./src/server/db/models/User');
var Expense = require('./src/server/db/models/Expense');
var data = require('./data.json');


// Removes all Users
User.remove({}, function(err, user){
  if(err){
    return console.err(err);
  }

  console.dir('Deleted all users!');
});

// Inserts custom data
User.collection.insertMany(data, function(err, users){
  if(err){
    return console.err(err);
  }
  console.dir('inserted')
  console.dir('Imported json data!');
});

// Prints all Users
User.find(function(err, users) {
  if(err) {
    return console.error(err);
  }

  console.log(users);
  db.close();
})
