var express = require('express');
var router = express.Router();
const passport = require('passport');
const Spot = require('../models/spot');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const spots = await Spot.find();
  console.log(spots);
  res.render('index', { title: 'ReelDeal', spots });
});


router.get('/auth/google', passport.authenticate(

  'google',
  {
    scope: ['profile', 'email'],
    // Optional
    // prompt: "select_account"
  }
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/spots',
    failureRedirect: '/'
  }
));
router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('/');
  });
});

module.exports = router;
