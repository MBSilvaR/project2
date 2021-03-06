const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');
const port = process.env.PORT || 8080;
const bcrypt = require('bcrypt');
const methodoverride = require('method-override');

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
app.use(methodoverride('_method'));

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
      res.render('home/index');
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
        res.redirect('/home')
      } else {
        res.send('Email/Password not found.')
      }
    });
  });
});


app.get("/home", function(req, res, next) {
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

app.get("/search", function(req, res, next) {
  if (req.session.user) {
    var logged_in = true;
    var email = req.session.user.email;
  }

  var data = {
    "logged_in": logged_in,
    "email": email
  }
  res.render('search/index', data);

});

app.get("/subscribe", function(req, res) {
  if (req.session.user) {
    var logged_in = true;
    var email = req.session.user.email;
  }

  var data = {
    "logged_in": logged_in,
    "email": email
  }
  res.render('subscribe/index', data);
});

app.get("/my_account", function(req, res) {
  res.render('my_account/index');
});

app.get("/favorites", function(req, res) {
  if (req.session.user) {
    var logged_in = true;
    var email = req.session.user.email;
  }

  var logInfo = {
    "logged_in": logged_in,
    "email": email
  }
  db.any("SELECT * FROM articles WHERE user_id = $1", [req.session.user.id]).then(function(data) {
    var articleInfo = data;
    var stuff = {
      'data': logInfo,
      'title': articleInfo
    }
    res.render('favorites/index', stuff)
  });
});

app.post("/save", function(req, res) {
  var userId;
  var logged_in;
  var email;
  if (req.session.user) {
    logged_in = true;
    email = req.session.user.email;
    userId = req.session.user.id;
  }
  var data = {
    "logged_in":logged_in,
    "email":email
  }
  var title = req.body.title;
  var webUrl = req.body.url;
  db.none(
    "INSERT INTO articles (title, user_id, url) VALUES ($1, $2, $3)", [title, userId, webUrl]
  ).then(function() {
    res.render('home/index', data);
  })

  app.get('/delete/:id', function(req, res) {
    console.log(req.params);
    db.none(
      "DELETE FROM articles WHERE id = $1", [req.params.id]
    )
    // .then(function() {
      res.redirect('/');
    // })

  })

});
