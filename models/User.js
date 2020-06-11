const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    firstname: {type: String},
    surname: {type: String},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    img: {type: String},
    birthdate: {type: Date},
    phone: {type: String},
    bio: {type: String},

    address: {type: String},
    city: {type: String},
    country: {type: String},
    geometry: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    post: {type: Schema.Types.ObjectId, ref: 'Post'}
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
});
UserSchema.methods.isValidPassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isEqual) => done(isEqual));
};

module.exports = mongoose.model('User', UserSchema);