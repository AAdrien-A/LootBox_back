var express = require('express');
var router = express.Router();
var passport = require('passport');
const User = require('../models/User');

const userCtrl = require('../controllers/users');

// GET users listing
router.get('/login', passport.authenticate('jwt', { session : false }), (req, res, next) => {
    res.json({
        message : 'You made it to the secure route',
        user : req.user,
        token : req.query.secret_token
    })
});

router.post('/', userCtrl.register);
router.post('/login', userCtrl.login);

// Updating One


module.exports = router;
