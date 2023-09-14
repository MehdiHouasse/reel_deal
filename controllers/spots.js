
const Spot = require('../models/spot');
const FishingSpot = require('../models/fish');


// Controller function for displaying a list of all spots
async function listSpots(req, res) {
  try {
    const spots = await Spot.find();
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

    // Find the spot by ID and populate the user field
    const spot = await Spot.findById(spotId).populate('user');

    res.render('spots/show', { spot, title: "Fishing Spot Details" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function edit(req, res) {
  const spot = await Spot.findOne({ _id: req.params.id, user: req.user._id });
  if (!spot) return res.redirect('/spots');
  res.render('spots/edit', { spot, title: "Edit Details" });
}
async function update(req, res) {
  try {
    const updatedSpot = await Spot.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      // update object with updated properties
      req.body,
      { new: true }
    );
    return res.redirect(`/spots/${updatedSpot._id}`);
  } catch (e) {
    console.log(e.message);
    return res.redirect('/spots');
  }
}
async function deleteFishingSpot(req, res) {
  const spot = await Spot.findOneAndRemove({ _id: req.params.id, user: req.user._id });
  // Redirect back
  res.redirect('/spots');

}

module.exports = {
  update,
  edit,
  deleteFishingSpot,
  listSpots,
  showAddSpotForm,
  addSpot,
  showSpotDetails,
};
