var passport = require('passport');
var User = require('../models/User');

var addNewUser = function(req, res, next) {
    User.register( new User(
        {
            username: req.body.username,
            password: req.body.password,
            role: 'Viewer',
            account: Date.now()+"-"+Math.floor((Math.random() * 10) + 1)
        }
    ),
        req.body.password,
        (err, user)=>{
          if (err) {
            res.render('error',{err: err})
          } else {
            passport.authenticate('local')(req, res, user=>{
              res.render('account',{
                user: req.user,
              });
            })
          }
        });
}

module.exports = addNewUser;


