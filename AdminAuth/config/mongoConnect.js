const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to: localhost');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error' + err);
});

module.exports = mongoose;