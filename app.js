var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var leader = require('./routes/leader')
var proMotion = require("./routes/promotion")
var dishRouter = require('./routes/dishrouter.js')

const mongoose = require('mongoose');
const Dishes = require('./modal/dishes');

const url = "mongodb://localhost:27017/conFusion"
const connect = mongoose.connect(url);
connect.then((db)=>{
  console.log('Connected Correcly to the server');

}).catch((err)=>{
  console.log("databaseConnection ErrorwhilE ConnEcting",err)
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dish',dishRouter);
app.use('/promotion',proMotion);
app.use('/leader',leader);

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
