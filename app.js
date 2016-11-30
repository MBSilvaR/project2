const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');
const port = process.env.PORT || 8080;
const bcrypt = require('bcrypt');


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(session({
  secret: 'testtesttest',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}))


var db = pgp(process.env.DATABASE_URL || 'postgres://marcelasilva@localhost:5432/art_crud');

app.listen(port)
console.log("Server started on " + port);

// ****

app.get("/", function(req, res, next) {
  var logged_in;
  var email;

  if (req.session.user) {
    logged_in = true;
    email = req.session.user.email;
  }

  var data = {
    "logged_in": logged_in,
    "email": email
  }

  res.render('home/index', data);
});

app.get("/subscribe", function(req, res) {
  res.render('subscribe/index')
});

app.post('/subscribe', function(req, res) {
  var data = req.body;

  bcrypt.hash(data.password, 10, function(err, hash) {
    db.none(
      "INSERT INTO users (email, password_digest) VALUES ($1, $2)", [data.email, hash]
    ).then(function() {
      res.send('Welcome!');
    })
  });
})

app.post('/my_account', function(req, res) {
  var data = req.body;

  db.one(
    "SELECT * FROM users WHERE email = $1", [data.email]
  ).catch(function() {
    res.send('Email/Password not found.')
  }).then(function(user) {
    bcrypt.compare(data.password, user.password_digest, function(err, cmp) {
      if (cmp) {
        req.session.user = user;
        res.render('account_page/index.html', user);
      } else {
        res.send('Email/Password not found.')
      }
    });
  });
});

// *****

app.get("/home", function(req, res, next) {
  res.render('home/index');
});

app.get("/search", function(req, res, next) {
  res.render('search/index');
});

app.get("/subscribe", function(req, res) {
  res.render('subscribe/index');
});

app.get("/my_account", function(req, res) {
  res.render('my_account/index');
});

app.get("/account_page", function(req, res) {
  res.render('account_page/index');
});

app.get("/save", function(req, res) {
  res.render('account_page/index');
});

