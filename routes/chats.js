const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/', (req, res) => {
    Message.find().sort({ createdAt: -1 }).populate('User').exec((err, messages) => {
        res.render('', { title: '', messages: messages });
    });
});

router.post('/', (req, res) => {
    const message = new Message({ content: req.body.content, user: req.user });
    message.save((err, newMessage) => {
        if (err) return res.json(err);
        res.json(newMessage);
    });
});

module.exports = router;