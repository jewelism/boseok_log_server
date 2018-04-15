const express = require('express');
const router = express.Router();

const articles = require('./articles/routes');
router.use('/articles', articles);

const chats = require('./chats/routes');
router.use('/chats', chats);

module.exports = router;