var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

const auth = require('../middleware/auth');

 // GET posts
router.get('/', auth, function (req, res, next) {
    Post.find().exec((err, posts) => {
        res.json(posts)
    })
});

// POST posts
router.post('/', auth, (req, res) => {
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

// Update posts
router.put('/:id', auth, (req, res, next) => {
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        username: req.body.username,
        img: req.body.img,
        tags: req.body.tags,
        plateform: req.body.plateform,
        productCondition: req.body.productCondition,
        price: req.body.price
    });
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
   Post.deleteOne({_id: req.params.id}).then(
       () => {
           res.sendStatus(200).json({
               message: 'Post deleted'
           });
       }
   ).catch(
       (error) => {
           res.sendStatus(400).json({
               error:error
           });
       }
   );
});


module.exports = router;