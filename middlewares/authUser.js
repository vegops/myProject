var passport = require('passport');

var authUser = function(req, res, next) {
    passport.authenticate('local')(req, res, user=>{
    })
    next(req.user);
}

module.exports = authUser;


