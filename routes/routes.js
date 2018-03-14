const express = require('express')
const router = express.Router()

const users = require('./users/routes')
router.use('/users', users)

const articles = require('./articles/routes')
router.use('/articles', articles)

module.exports = router;