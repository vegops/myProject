var express = require('express');
var router = express.Router();
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var addNewUser = require('../middlewares/newUser');
var authUser = require('../middlewares/authUser');
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.userData) {
    var user = JSON.parse(req.cookies.userData);
    res.render('account', { user });
  } else {
    res.render('account', {  });
  }
});

router.post('/new', addNewUser, function(req, res, next) {
  console.log(req.body.username+" was added to database!");
  res.redirect('/');
})

router.post('/exist', authUser, function(req, res, next) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) { 
      console.log("error:"+ err);
      return done(err); 
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(req.body.password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    user.password = undefined;
      res.setHeader('Set-Cookie', cookie.serialize('userData', JSON.stringify(user), {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week 
      }));
      res.redirect('/account');
      return user;
    });
})

router.get('/logout', (req, res, next)=>{
  req.session.destroy(function(err) {
    // cannot access session here
  });
  res.setHeader('Set-Cookie', cookie.serialize('userData', "deleted", {
    httpOnly: true,
    path: '/',
    maxAge: 0
  }));
  res.redirect('/');
})

module.exports = router;
