const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const passport = require('passport');

const multer = require('../middleware/multer-config');
const fs = require('fs');

// GET posts
router.get('/', function (req, res, next) {
    Post.find().populate('user').exec((err, posts) => {
        res.json(posts)
    })
});

// POST posts
router.post('/', multer, passport.authenticate('jwt', { session : false }), (req, res) => {
    const post = new Post({
        title: req.body.title,
        user: req.user,
        img: req.body.img,
        mainCategory: req.body.mainCategory,
        platform: req.body.platform,
        description: req.body.description,
        productCondition: req.body.productCondition,
        price: req.body.price,
    });
    post.save((err, newPost) => {
        if (err) return res.json(err);
        res.json(newPost);
    });
});

// Update posts
router.put('/:id', multer, (req, res, next) => {
    let post = new Post({_id: req.params._id});
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.post = JSON.parse(req.body.post);
        post = {
            _id: req.params.id,
            title: req.body.post.title,
            username: req.body.post.username,
            img: url + '/images/' + req.file.filename,
            // tags: req.body.post.tags,
            mainCategory: req.body.mainCategory,
            platform: req.body.post.platform,
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
            // tags: req.body.tags,
            mainCategory: req.body.mainCategory,
            platform: req.body.platform,
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
router.delete('/:id', (req, res, next) => {
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