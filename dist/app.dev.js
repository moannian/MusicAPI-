"use strict";

var createError = require('http-errors');

var express = require('express');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var session = require('express-session');

var redisConnect = require('connect-redis')(session);

var redisClient = require('./utils/Redis');

var path = require('path');

var fs = require('fs'); // 路由


var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var app = express();
var ENV = process.env.NODE_ENV;

if (ENV !== "production") {
  app.use(logger('dev'));
} else {
  var paths = path.join(__dirname, '/log/access.log');
  var WriteStream = fs.createWriteStream(paths, function () {
    flags: 'a';
  });
  app.use(logger("combined"), function () {
    stream: WriteStream;
  });
}

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser()); //使用redis

var redisStore = new redisConnect({
  client: redisClient
}); // 使用session

app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'WKWWKPWP+KSLK#ewew1#',
  // cookie配置
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore
}));
console.log("cur time");
app.use('/', indexRouter);
app.use('/users', usersRouter); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;