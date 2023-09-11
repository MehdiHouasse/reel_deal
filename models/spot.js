const mongoose = require('mongoose');

const fishingSpotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  availableFishSpecies: {
    type: [String], // Assuming available fish species are stored as an array of strings
    required: true,
  },
});

const FishingSpot = mongoose.model('FishingSpot', fishingSpotSchema);

module.exports = FishingSpot;
