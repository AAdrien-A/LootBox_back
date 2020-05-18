var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/User');

const userCtrl = require('../controllers/users');

// GET users listing
router.get('/', function (req, res, next) {
    res.render('register');
});

router.post('/', userCtrl.register);
router.post('/', userCtrl.login);

module.exports = router;
