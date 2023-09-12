const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  fishSpecies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fish",
  }],
});

const Spot = mongoose.model('Spot', spotSchema);

module.exports = Spot;
