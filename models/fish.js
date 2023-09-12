const mongoose = require('mongoose');

const fishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

});

const Fish = mongoose.model('Fish', fishSchema);

module.exports = Fish;
