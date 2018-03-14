var express = require('express');
var router = express.Router();
const findQuery = require('../../query/find')

const uri = 'articles'
router.all('/', function (req, res, next) {
  console.log(`Accessing the ${uri}...`);
  next();
});

/* Get /articles */
// root query
const query = `SELECT * from ${uri}`
router.get('/', (req, res, next) => {
  findQuery(res, uri, query);
});

module.exports = router;