const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
    user: {type: Schema.Types.ObjectID, ref:'User'},
    title: {type: String, required: true},
    img: {type: String, required: true},
    tags: {type: String, required: true},
    plateform: {type: String, required: true},
    productCondition: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Post', PostSchema);