const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /spots/:id/reviews (create review for a spot)
router.post('/spots/:id/reviews', ensureLoggedIn, reviewsCtrl.create);


module.exports = router;
