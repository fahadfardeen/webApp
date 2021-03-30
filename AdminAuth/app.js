var express = require('express');
var app = express();
var db = require('./config/mongoConnect');
var path = require('path');
var UserController = require('./routes/UserController');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', UserController);

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;