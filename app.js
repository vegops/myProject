var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('./db/connection');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var account = require('./routes/account');
var about = require('./routes/about');
var contact = require('./routes/contact');

// app models
var User = require('./models/User');
var Account = require('./models/Account');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//add session and passport login control
app.use(session({
  secret: 'login_secret121212',
  cookie: { maxAge: 2628000000, data: User },
  resave: true,
  saveUninitialized: true,
  rolling: true
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new Strategy(User.authenticate()));
passport.use(new Strategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', index);
app.use('/users', users);
app.use('/account', account);
app.use('/about', about);
app.use('/contact', contact);
app.use('/user', account);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
