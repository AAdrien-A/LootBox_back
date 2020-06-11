const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');

const User = require('../models/User');

passport.use(new JwtStrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (jwt_payload, done) => {
    return done(null, jwt_payload.user);
}));

passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    User.findOne({username}, (err, user) => {
        if (!user) {
            return done(null, false, {message: 'User not found'});
        }
        user.isValidPassword(password, isValid => {
            if (!isValid) {
                return done(null, false, {message: 'Wrong Password'});
            }
            return done(null, user, {message: 'Logged in Successfully'});
        });
    });
}));