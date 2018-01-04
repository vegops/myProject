const mongoose = require('../db/connection');
const plm = require('passport-local-mongoose');

const accountSchema = mongoose.Schema({
    account: {
        number: Number,
        balance: Number,
        standing: String,
        valid: Date
    }
});

accountSchema.plugin(plm);

var Account = mongoose.model('accounts', accountSchema);

module.exports = Account;