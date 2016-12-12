var db = require('./db/config');
var User = require('./db/models/User');
var Expense = require('./db/models/Expense');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var path = require('path');

var session = require('express-session');

var SECRET = 'blah!'


// Authentication
app.use(session({
  secret: SECRET,
  cookieName: 'session',
}));


// Middleware
app.use('/static', express.static(__dirname + "/../client/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Allow CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// All routes go here
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, './../client', 'index.html'));
});

app.get('/expenses', function(req, res) {
  if(!req.session.userCookie) {
    res.redirect('/')
  }
  res.sendFile(path.resolve(__dirname, './../client', 'index.html'));
});

app.post('/login', function(req, res) {
  // Check if user exits in DB
  if (req.body.username === '' || req.body.password === '') {
    res.sendStatus(404);
  }
  handleAuth(req.body.username, req.body.password, function(userInfo) {
    if (userInfo === false) {
     res.sendStatus(404);
    } else {
      req.session.userCookie = userInfo;
      res.send(true);
    }
  });
});

app.get('/api/userExpenses', function(req, res) {
  if(!req.session.userCookie) {
    res.redirect('/');
  }
  let cookie = req.session.userCookie;

  handleAuth(cookie.username, cookie.password, function(userInfo) {
    if (userInfo === false) {
     res.sendStatus(404);
    } else {
      res.send(userInfo.expenses);
    }
  })
});

app.post('/api/userExpenses', function(req, res) {
  // Post to database
  User.findOne({username: req.session.userCookie.username}, function(err, user) {
    user.expenses.push({amount: req.body.amount, description: req.body.description});
    user.save(function(err) {
      if(err) console.log(err)
      console.log('inserted');
      res.send(true);
    });
  });
})

app.delete('/api/userExpenses', function(req, res) {
  User.findOne({username: req.session.userCookie.username}, function(err, user) {
    var doc = user.expenses.id(req.body._id).remove();
    user.save(function(err) {
      if(err) console.log(err)
        console.log('deleted');
      res.send(true)
    })
  })
})

app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

// helper function to handle authentication
function handleAuth(inputUser, inputPass, cb) {
  inputUser = inputUser.toLowerCase();
 // Check if user exits in DB
  User.findOne({ username: inputUser } , function(err, user) {
    if (err) return cb(err);

    // User doesn't exist
    if (user === null) {
      return cb(false);
    } else {
      // User does exist
      // Check password
      User.findOne({ username: inputUser, password: inputPass }, function(err, validated) {
        if (err) return cb(err);

        // Password is incorrect
        if (!validated) {
          return cb(false);
        } else {
          // Password is correct
          return cb(validated);
        }
      });
    }
  });
}

// Server port
var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
  console.log('Listen to the port', 'localhost' + ':' + PORT);
});