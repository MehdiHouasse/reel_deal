const Spot = require("../models/spot")

async function create(req, res) {
  const spot = await Spot.findById(req.params.id);
console.log(spot);
  // Add the user-centric info to req.body
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;


  spot.reviews.push(req.body);
  try {
    // Save any changes made to the movie doc
    await spot.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/spots/${spot._id}`);
}
module.exports = {
  create,
  delete: deleteReview
};

async function deleteReview(req, res) {
  try {
    const spot = await Spot.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
    if (!spot) {
      // Unauthorized access or review not found
      return res.status(403).redirect('/spots');
    }

    // Remove the review
    spot.reviews.remove(req.params.id);

    await spot.save();
    // Redirect back to the fishing spot's show view
    return res.redirect(`/spots/${spot._id}`);
  } catch (error) {
    console.error(error);
    // Handle other errors
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
