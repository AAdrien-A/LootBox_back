const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            User.register(newUser, req.body.password, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                res.json(user);
            })
        }
    );
};

exports.login = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            const error = new Error(info.message);
            return next(error);
        }
        req.login(user, {session: false}, err => {
            if (err) return next(err);
            const body = {_id: user._id, username: user.username};
            const token = jwt.sign({user: body}, 'top_secret');
            return res.json({token});
        });
    })(req, res, next);
};

