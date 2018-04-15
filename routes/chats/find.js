const router = require('express').Router();
const pool = require('../../config/db');
const ResBody = require('../../models/ResBody');
const find = require('../../query/find');

const cacheUri = 'chats_all'
router.get('/', (req, res, next) => {
  const query = "select * from (SELECT * from chats order by id desc limit 10) sub order by id asc";
  find(res, cacheUri, { query });
})

module.exports = router;