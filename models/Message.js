const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
    content: {type: String, required: true},
    seen: {type: Boolean, required: true},
    sender: {
        type: MessageSchema.Types.ObjectID,
        ref: 'username'
    },
    recipient: {
        type: MessageSchema.Types.ObjectID,
        ref: 'username'
    },
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);