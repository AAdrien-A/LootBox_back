const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
    content: {type: String, required: true},
    seen: {type: Boolean, required: true},
    sender: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    recipient: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);