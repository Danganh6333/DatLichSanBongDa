require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const expressLayout = require('express-ejs-layouts');
const methodOveride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const {isActiveRoute} = require('./server/helpers/routeHelpers')

var indexRouter = require('./server/routes/index');
var API = require('./server/routes/API/API_routes');

var app = express();

app.use(logger('dev'));
app.set('layout','./layouts/main')
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOveride('_method'))

app.locals.isActiveRoute = isActiveRoute

app.use(session({
  secret:'keyboard cat',
  resave : false,
  saveUninitialized:true,
  store : MongoStore.create({
      mongoUrl : process.env.MONGO_URI
  })
}))

app.use(expressLayout);
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/auth_routes'));
app.use('/', require('./server/routes/khachHang_routes'));
app.use('/', require('./server/routes/nhanVien_routes'));
app.use('/', require('./server/routes/chuSan_routes'));

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
