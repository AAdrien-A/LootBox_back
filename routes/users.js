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

//Authentification + registration
router.post('/', userCtrl.register);
router.post('/login', userCtrl.login);

// Updating One
router.put('/users/:id', (req, res, next, err) => {
    const user = new User({
        _id: req.params.id,
        img: req.body.img,
        firstname: req.body.firstname,
        surname: req.body.surname,
        birthdate: req.body.birthdate,
        bio: req.body.bio,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    });
    User.updateOne({_id: req.params.id}, user).then(() => {
        if (err) return res.json(err);
        res.json(User);
    });
});

module.exports = router;
