const express = require('express');
const router = express.Router();
const ForumPost = require('../models/ForumPost');

const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    ForumPost.find().sort({createdAt: -1}).populate('user').exec((err, forumPost) => {
        res.render('', {title: '', messages: forumPost});
    });
});

router.post('/', auth, (req, res) => {
    const forum = new ForumPost({
        user: req.user,
        title: req.body.content,
        img: req.body.img,
        tags: req.body.tags,
        plateform: req.body.plateform,
        content: req.body.content
    });
    forum.save((err, newForumPost) => {
        if (err) return res.json(err);
        res.json(newForumPost);
    });
});

module.exports = router;