const express = require('express');
const router = express.Router();
const passport = require('passport');
const ForumPost = require('../models/ForumPost');

router.get('/', (req, res) => {
    ForumPost.find().sort({createdAt: -1}).populate('user').exec((err, forumPosts) => {
        res.json(forumPosts);
    });
});

router.post('/', passport.authenticate('jwt', { session : false }), (req, res) => {
    const forum = new ForumPost({
        user: req.user,
        title: req.body.content,
        img: req.body.img,
        mainCategory: req.body.mainCategory,
        platform: req.body.platform,
        content: req.body.content
    });
    forum.save((err, newForumPost) => {
        if (err) return res.json(err);
        res.json(newForumPost);
    });
});

module.exports = router;