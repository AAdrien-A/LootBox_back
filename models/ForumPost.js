const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ForumPostSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    title: {type: String, required: true},
    mainCategory: {type: String},
    platform: {type: String},
    img: {type: String},
    content: {type: String, required: true}
});

module.exports = mongoose.model('ForumPost', ForumPostSchema);