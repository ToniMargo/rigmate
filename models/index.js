const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI;
db.customer = require('./customer.js')(mongoose);
db.pizza = require('./pizza.js')(mongoose);

module.exports = db;
