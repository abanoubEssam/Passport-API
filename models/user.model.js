const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    googleId: String,

})

const User = new mongoose.model('users' , userSchema);

module.exports = User;