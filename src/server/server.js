var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var path = require('path');

var session = require('express-session');

var SECRET = 'blah!'


// Authentication
app.use(session({secret: SECRET}));


// Middleware
app.use('/static', express.static(__dirname + "/../client/"));

app.use(bodyParser.json());

// Allow CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

require('./routes.js')(app, express);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log('Listen to the port', 'localhost' + ':' + PORT);
});