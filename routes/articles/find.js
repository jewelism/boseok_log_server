const router = require('express').Router();
const pool = require('../../config/db')
const ResBody = require('../../models/ResBody')
const find = require('../../query/find')

// router.all('/:id', function (req, res, next) {
//   console.log(`Accessing the ${cacheUri}...`);
//   next();
// });

router.get('/version', (req, res, next) => {
  const query = 'SELECT * from article_version'
  find(res, null, { query });
})

const cacheUri = 'articles_all'
router.get('/all', (req, res, next) => {
  const query = 'SELECT * from articles'
  find(res, cacheUri, { query });
})

/* GET One from articles. */
router.get('/:id', (req, res, next) => {
  const { id } = req.params
  if (parseInt(id)) {
    query = `SELECT * from articles where id=?`
    find(res, `article_id${id}`, { query, params: id }); //id cache
    // find(res, null, query, id); //no id cache
  } else {
    res.status(400).send(new ResBody(false, null, 'invalid param, only Integer'))
  }
});

module.exports = router;