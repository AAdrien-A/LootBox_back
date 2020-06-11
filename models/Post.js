const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    img: {type: String},
    mainCategory: {type: String},
    platform: {type: String},
    description: {type: String},
    productCondition: {type: String},
    price: {type: Number}
});

module.exports = mongoose.model('Post', PostSchema);