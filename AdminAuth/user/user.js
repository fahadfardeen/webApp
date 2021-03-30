var mongoose = require('mongoose');
// Add auto increment ID
var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');