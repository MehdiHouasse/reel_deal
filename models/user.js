// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    //required: true,
    unique: true, // Ensures that userId is unique
  },
  username: {
    type: String,
    //required: true,
    unique: true, // Ensures that username is unique
  },
  email: {
    type: String,
    //required: true,
    unique: true, // Ensures that email is unique
  },
  password: {
    type: String,
   // required: true,
  },
  googleId: String, // Google ID, optional if you support Google login
  avatar: String, // URL to user's avatar image
}, {
  timestamps: true,
});

const user = mongoose.model('user', userSchema);

module.exports = user;
