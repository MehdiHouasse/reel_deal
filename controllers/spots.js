
const Spot = require('../models/spot');
const FishingSpot = require('../models/fish');


// Controller function for displaying a list of all spots
async function listSpots(req, res) {
  try {
    const spots = await Spot.find();
    console.log(spots);
    res.render('spots/index', { spots, title: 'All spots' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
}

// Controller function for displaying the form to add a new spot
function showAddSpotForm(req, res) {
  res.render('spots/new', { title: 'ADD spot' });
}

// Controller function for handling the submission of a new spot
async function addSpot(req, res) {
  try {
    req.body.user = req.user._id;

    // Save the new spot to the database
    await Spot.create(req.body);

    // Redirect
    res.redirect('/spots');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
}

// Controller function for displaying spot details
async function showSpotDetails(req, res) {
  try {
    const spotId = req.params.id;

    // Find the spot by ID and populate the fishSpecies field
    const spot = await Spot.findById(spotId).populate('user');

    res.render('spots/show', { spot, title: "Fishing Spot Details" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function editFishingSpot(req, res) {
  try {
    const spot = await Spot.findById(req.params.id);
    if (!spot) return res.redirect('/spots');


    spot.name = req.body.name;
    spot.location = req.body.location;

    // Save the updated spot
    await spot.save();

    // Redirect back to the spot's show view
    res.redirect(`/spots/${spot._id}`);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function deleteFishingSpot(req, res) {
  const spot = await Spot.findOneAndRemove({ _id: req.params.id, user: req.user._id });
  // Redirect back
  res.redirect('/spots');

}

module.exports = {
  editFishingSpot,
  deleteFishingSpot,
  listSpots,
  showAddSpotForm,
  addSpot,
  showSpotDetails,
};
