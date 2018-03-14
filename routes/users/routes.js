const express = require('express');
const router = express.Router();

const userRoot = require('./root')
router.use('/', userRoot)

const findUser = require('./find')
router.use('/', findUser)

module.exports = router;