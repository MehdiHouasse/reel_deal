const Spot = require('../models/spot');
const FishingSpot = require('../models/fish');
//display all spots
async function listSpots(req, res) {

  try {
    const spots = await Spot.find();
    console.log(spots);
    res.render('spots/index', { spots, title: "All spots" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
}

// Controller function for displaying the form to add a new spot
function showAddSpotForm(req, res) {

  res.render('spots/new', {title: "ADD spot"});
}

// Controller function for handling the submission of a new spot
async function addSpot(req, res) {
  try {
    const { name, location, fishSpecies } = req.body;

    // Create a new Spot
    const newSpot = new Spot({
      name,
      location,
      fishSpecies,
    });

    // Save the new spot to the database
    await newSpot.save();

    // Redirect to the list of spots after successfully adding a new spot
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
    const spot = await Spot.findById(spotId);

    if (!spot) {
      return res.status(404).render('not-found');
    }

    res.render('spots/show', { spot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  listSpots,
  showAddSpotForm,
  addSpot,
  showSpotDetails,
};
