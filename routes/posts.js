var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

/* GET Posts */
router.get('/', function (req, res, next) {
    Post.find().exec((err, posts) => {
        res.json(posts)
    })
});

/* POST Posts */
router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        username: req.body.username,
        img: req.body.img,
        tags: req.body.tags,
        plateform: req.body.plateform,
        productCondition: req.body.productCondition,
        price: req.body.price
    });
    post.save((err, newPost) => {
        if (err) return res.json(err);
        res.json(newPost);
    });
});

/* Updating Posts */
router.patch('/:id', getPost, async (req, res) => {
    if (req.body.title != null) {
        res.post.title= req.body.title
    }
    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

/* Delete Post */
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove();
        res.json({message: 'Deleted Post'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

module.exports = router;