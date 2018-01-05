var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.userData) {
    var user = JSON.parse(req.cookies.userData);
    res.render('about', { title: 'About page', user });
  } else {
    res.render('about', { title: 'About page' });
  }

});

module.exports = router;
