var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const fs = require('fs');

// GET posts
router.get('/', auth, function (req, res, next) {
    Post.find().exec((err, posts) => {
        res.json(posts)
    })
});

// POST posts
router.post('/', auth, multer, (req, res) => {
    req.body.post = JSON.parse(req.body.post);
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.post.title,
        username: req.body.post.username,
        img: url + '/images/' + req.file.filename,
        tags: req.body.post.tags,
        plateform: req.body.post.plateform,
        description: req.body.post.description,
        productCondition: req.body.post.productCondition,
        price: req.body.post.price,
        userId: req.body.post.userId
    });
    post.save((err, newPost) => {
        if (err) return res.json(err);
        res.json(newPost);
    });
});

// Update posts
router.put('/:id', auth, multer, (req, res, next) => {
    let post = new Post({_id: req.params._id});
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.post = JSON.parse(req.body.post);
        post = {
            _id: req.params.id,
            title: req.body.post.title,
            username: req.body.post.username,
            img: url + '/images/' + req.file.filename,
            tags: req.body.post.tags,
            plateform: req.body.post.plateform,
            description: req.body.post.description,
            productCondition: req.body.post.productCondition,
            price: req.body.post.price,
            userId: req.body.post.userId
        };
    } else {
        post = {
            _id: req.params.id,
            title: req.body.title,
            username: req.body.username,
            img: req.body.img,
            tags: req.body.tags,
            plateform: req.body.plateform,
            description: req.body.description,
            productCondition: req.body.productCondition,
            price: req.body.price,
            userId: req.body.userId
        };
    }
    Post.updateOne({_id: req.params.id}, post).then(
        () => {
            res.sendStatus(201).json({
                message: 'Post updated successfully'
            });
        }
    ).catch(
        (error) => {
            res.sendStatus(400).json({
                error: error
            });
        }
    );
});

// Delete posts
router.delete('/:id', auth, (req, res, next) => {
    Post.findOne({_id: req.params.id}).then(
        (post) => {
            const filename = post.img.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Post.deleteOne({_id: req.params.id}).then(
                    () => {
                        res.sendStatus(200).json({
                            message: 'Post deleted'
                        });
                    }
                ).catch(
                    (error) => {
                        res.sendStatus(400).json({
                            error: error
                        });
                    }
                );
            });
        }
    );
});

module.exports = router;