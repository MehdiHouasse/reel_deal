// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: String,
  avatar: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
