const express = require('express');
const router = express.Router();

const articlesRoot = require('./root')
router.use('/', articlesRoot)

const findArticle = require('./find')
router.use('/', findArticle)

const saveArticle = require('./save')
router.use('/', saveArticle)

module.exports = router;