const mongoose = require('../config/mongoConnect');
// Add auto increment ID
var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);