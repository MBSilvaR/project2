const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const PORT = process.env.PORT || 3000;


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));


var db = pgp (process.env.DATABASE_URL || 'postgres://marcelasilva@localhost:5432/node_test');
