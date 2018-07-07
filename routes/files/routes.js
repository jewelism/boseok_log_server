const express = require('express');
const router = express.Router();

const findFile = require('./find');
router.use('/', findFile);

const saveFile = require('./save');
router.use('/', saveFile);

const deleteFile = require('./delete');
router.use('/', deleteFile);

module.exports = router;