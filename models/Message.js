const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
    user: {type: Schema.Types.ObjectID, ref: 'User'},
    content: {type: String, required: true},
    seen: {type: Boolean, required: true},
    sender: {
        type: String,
        ref: 'User'
    },
    recipient: {
        type: String,
        ref: 'User'
    },
});

module.exports = mongoose.model('Message', MessageSchema);