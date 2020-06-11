const express = require('express');
const router = express.Router();
const ForumPost = require('../models/ForumPost');

router.get('/', (req, res) => {
    ForumPost.find().sort({createdAt: -1}).populate('user').exec((err, forumPost) => {
        res.json();
    });
});

router.post('/', (req, res) => {
    const forum = new ForumPost({
        user: req.user,
        title: req.body.content,
        img: req.body.img,
        // tags: req.body.tags,
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