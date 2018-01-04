const mongoose = require('mongoose');
const dbUrl = "mongodb://localhost:27017/login";

mongoose.connect(dbUrl, { MongoClient: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', err=> console.log('err'));
db.once('open',()=>console.log('connected to MONGO_DB'));

module.exports = mongoose;