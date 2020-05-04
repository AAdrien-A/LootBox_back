const mongoose = require('mongoose');
const Schema = mongoose.Schema;
bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    firstname: {type: String},
    surname: {type: String},
    username: {type: String, required: true, index: {unique: true}},
    email: {type: String, required: true},
    password: {type: String, required: true},

    img: {type: String},
    birthdate: {type: Date},
    phone: {type: String},

    address: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
});

UserSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);