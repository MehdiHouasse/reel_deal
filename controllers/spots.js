const Spot = require('../models/spot');
//const Performer = require('../models/performer');

module.exports = {
  index,
  show,
  new: newSpot,
  create
};

async function index(req, res) {
  const spots = await Spot.find({});
  res.render('spots/index', { title: 'All Spots', spots });
}

async function show(req, res) {
  // Populate the cast array with performer docs instead of ObjectIds
  const spot = await Spot.findById(req.params.id).populate('cast');
  // Mongoose query builder approach to retrieve performers not the movie:
  // Performer.find({}).where('_id').nin(movie.cast)
  // The native MongoDB approach uses a query object to find
  // performer docs whose _ids are not in the movie.cast array like this:
  const performers = await Performer.find({ _id: { $nin: movie.cast } }).sort('name');
  res.render('movies/show', { title: 'Movie Detail', movie, performers });
}

function newSpot(req, res) {
  // Initialize errorMsg as an empty string
  let errorMsg = '';

  // Check if the form has been submitted
  if (req.method === 'POST') {
    // Retrieve form data from the request body
    const { name, location, fishSpecies } = req.body;

    try {
      // Example: Create a new fishing spot and handle success or errors
      const newSpot = createFishingSpot(name, location, fishSpecies);

      // Assuming createFishingSpot returns the newly created spot
      // If successful, you can redirect to a success page or list of spots
      // Example: res.redirect('/spots'); // Redirect to the list of spots
      res.redirect('/?success=1');
    } catch (error) {
      // If there's an error during spot creation, set errorMsg
      errorMsg = 'Error creating the fishing spot. Please try again.';
    }
  }

  // Render the 'new.ejs' template with the title and errorMsg
  res.render('spots/new', { title: 'Add Spot', errorMsg });
}


async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new movie
    const spot = await Spot.create(req.body);
    // Redirect to the new movie's show functionality
    res.redirect(`/spots/${spot._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('spots/new', { errorMsg: err.message });
  }
}
