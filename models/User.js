const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);