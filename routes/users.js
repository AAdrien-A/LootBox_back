require('dotenv').config();
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Authentification */
router.get('/register', (req, res) => {
  res.render('register', {title: 'Créer un compte'});
});

router.post('/register', (req, res) => {
  const newUser = new User({username: req.body.username, email: req.body.email});
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('register', {title: 'Créer un compte'});
    }
    res.redirect('/');
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {


  // const username = req.body.username;
  // const user = {name: username};
  //
  // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  // res.json({accessToken: accessToken})
});

module.exports = router;
