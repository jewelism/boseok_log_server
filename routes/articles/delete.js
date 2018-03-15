var express = require('express');
var router = express.Router();
const save = require('../../query/save')
const ResBody = require('../../models/ResBody')

const uri = 'articles_all'

//delete article
router.delete('/:id', (req, res, next) => {
  const { id } = req.params
  if (id) {
    const query = `DELETE FROM articles WHERE id=${id}`
    save(res, null, query)
  } else {
    res.status(400).send(new ResBody(false, null, 'invalid param'))
  }
});

module.exports = router;