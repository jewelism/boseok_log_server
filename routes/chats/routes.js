const express = require('express');
const router = express.Router();

const findChat = require('./find');
router.use('/', findChat);

const saveChat = require('./save');
router.use('/', saveChat);

module.exports = router;