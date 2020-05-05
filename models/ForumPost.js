const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ForumPostSchema = new Schema({
    username: {type: UserSchema.Types.ObjectId, ref:'username'},
    title: {type: String, required: true},
    tags: {type: String, required: true},
    plateform: {type: String},
    img: {type: String},
    content: {type: String, required: true}
});

module.exports = mongoose.model('ForumPost', ForumPostSchema);