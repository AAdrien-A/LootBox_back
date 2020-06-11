const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
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