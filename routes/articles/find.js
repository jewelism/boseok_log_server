var express = require('express');
var router = express.Router();
var pool = require('../../config/db')
const ResBody = require('../../models/ResBody')
const find = require('../../query/find')

// router.all('/:id', function (req, res, next) {
//   console.log(`Accessing the ${cacheUri}...`);
//   next();
// });

router.get('/all', (req, res, next) => {
  const query = 'SELECT * from articles'
  const cacheUri = 'articles_all'
  find(res, cacheUri, query);
})

router.get('/version', (req, res, next) => {
  const query = 'SELECT * from article_version'
  find(res, null, query);
})

/* GET One from articles. */
router.get('/:id', (req, res, next) => {
  const { id } = req.params
  if (Number.isInteger(parseInt(id))) {
    query = `SELECT * from articles where id=${id}`
    find(res, null, query);
  } else {
    res.status(400).send(new ResBody(false, null, 'invalid param, only Integer'))
  }
});

module.exports = router;