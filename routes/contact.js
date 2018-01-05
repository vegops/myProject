var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.userData) {
    var user = JSON.parse(req.cookies.userData);
    res.render('contact', { title: 'Contact page', user });
  } else {
    res.render('contact', { title: 'Contact page' });
  }
});

module.exports = router;
