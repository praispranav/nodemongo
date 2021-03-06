var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var proMotioN = require("./routes/promotionrouter");
var dishRouter = require('./routes/dishrouter.js');
var Leader = require('./routes/dishrouter.js');

const mongoose = require('mongoose');

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

function auth(req,res,next){
  console.log(req.header)
  var authHeader = req.headers.authorization;
  if (!authHeader){
    var err = new Error("You are not Authenticated")
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401
    return next(err);

  }
  var auth = new Buffer(authHeader.split(' ')[1],'Base64').toString().split(':')
  var username = auth[0];
  var password =auth[1];

  
  if(username == 'admin'  && password == 'admin'){
    next();
  }else{
    var err = new Error("You are not Authenticated Email or password may be wrong ")
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 404
    return next(err);
  }
}
app.use(auth);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dish',dishRouter);
app.use('/promotion',proMotioN);
app.use('/leader',Leader);

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
