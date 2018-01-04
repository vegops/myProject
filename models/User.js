const mongoose = require('../db/connection');
const plm = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
    name:{
        first: String,
        last: String
    },
    age: Number,
    username: String,
    password: String,
    role: String,
    address: {
        country: String,
        city: String,
        street: String,
        house_no: String,
        apartment_no: String
    },
    account: String
});

userSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

userSchema.plugin(plm);

var User = mongoose.model('users', userSchema);

module.exports = User;