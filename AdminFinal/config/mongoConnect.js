const mongoose = require('mongoose');
const mongoConfig = require('../config/mongoConfig.json');

mongoose.connect(mongoConfig.url, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to: ' + mongoConfig.url);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error' + err);
});

module.exports = mongoose;