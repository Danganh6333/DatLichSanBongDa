var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayout = require('express-ejs-layouts');
const methodOveride = require('method-override');

var indexRouter = require('./routes/index');
var API = require('./routes/API');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOveride('_method'))

app.use(expressLayout);
app.use('/', indexRouter);
app.use('/API', API);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.set('layout','./layouts/main')
app.use('/',require('./server/routes/main'))
app.use('/',require('./server/routes/admin'))

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
