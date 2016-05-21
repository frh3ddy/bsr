var low = require('./lowdb');
var db = low('db', { storage: low.localStorage })

module.exports = db;
