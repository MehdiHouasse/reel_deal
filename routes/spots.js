const express = require('express');
const router = express.Router();
const spotsController = require('../controllers/spots');
const Spot = require('../models/spot'); // Import your Spot model

// Route for listing all spots
router.get('/', spotsController.listSpots);

// Route for displaying the form to add a new spot
router.get('/new', spotsController.showAddSpotForm);

// Route for displaying spot details
router.get('/:id', spotsController.showSpotDetails);

// Route for handling the submission of a new spot
router.post('/', spotsController.addSpot);


module.exports = router;
