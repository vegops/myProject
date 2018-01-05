var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.userData) {
    var user = JSON.parse(req.cookies.userData);
    res.render('index', { user });
  } else {
    res.render('index', {  });
  }
});

module.exports = router;
