async function create(req, res) {
  const spot = await Spot.findById(req.params.id);

  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
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
  // Note the cool "dot" syntax to query on the property of a subdoc
  const spot = await Spot.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
  // Rogue user!
  if (!spot) return res.redirect('/spots');
  // Remove the review using the remove method available on Mongoose arrays
  spot.reviews.remove(req.params.id);
  // Save the updated movie doc
  await spot.save();
  // Redirect back to the movie's show view
  res.redirect(`/spots/${spot._id}`);
}
