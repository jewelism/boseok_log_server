const express = require('express');
const router = express.Router();

const findArticle = require('./find')
router.use('/', findArticle)

const saveArticle = require('./save')
router.use('/', saveArticle)

module.exports = router;