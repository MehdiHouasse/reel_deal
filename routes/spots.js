const express = require('express');
const router = express.Router();

const spotsCtrl = require('../controllers/spots');
// Require the auth middleware
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', spotsCtrl.index);
// Use ensureLoggedIn middleware to protect routes
router.get('/new', ensureLoggedIn, spotsCtrl.new);
router.get('/:id', spotsCtrl.show);
router.post('/', ensureLoggedIn, spotsCtrl.create);

module.exports = router;
