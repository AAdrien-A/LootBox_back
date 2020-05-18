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
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);