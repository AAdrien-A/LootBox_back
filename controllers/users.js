const bcrypt = require('bcrypt');
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
    User.findOne({email: req.body.email}).then(
        (user) => {
            if (!user) {
                return res.sendStatus(401).json({
                    error: new Error('User not found')
                });
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.sendStatus(401).json({
                            error: new Error('Incorrect password')
                        });
                    }
                    const token = jwt.sign({userId: user._id}, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'});
                    res.sendStatus(200).json({
                        userId: user._id,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    res.sendStatus(500).json({
                        error: error
                    });
                }
            );
        }
    );
};