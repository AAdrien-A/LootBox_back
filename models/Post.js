const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
    user: {type: Schema.Types.ObjectID, ref: 'User'},
    title: {type: String, required: true},
    img: {type: String},
    tags: {
        type: {
            type: String,
            enum: ['Categories'],
        }
    },
    plateform: {type: String},
    description: {type: String},
    productCondition: {type: String},
    price: {type: Number}
});

module.exports = mongoose.model('Post', PostSchema);