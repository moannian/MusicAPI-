var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const redisConnect = require('connect-redis')(session);
const redisClient = require('./utils/Redis');
const path = require('path');
const fs = require('fs')

// 路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


const ENV = process.env.NODE_ENV;
if (ENV !== "production") {
    app.use(logger('dev'))
} else {
    let paths = path.join(__dirname, '/log/access.log');
    const WriteStream = fs.createWriteStream(paths, () => {
        flags: 'a'
    });

    app.use(logger("combined"), () => {
        stream: WriteStream
    })
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//使用redis
const redisStore = new redisConnect({
    client: redisClient
});
// 使用session
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
}))
console.log("cur time");
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;