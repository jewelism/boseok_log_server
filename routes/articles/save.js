var express = require('express');
var router = express.Router();
const save = require('../../query/save')
const ResBody = require('../../models/ResBody')
const { validate } = require('../../utils')

const categoryList = ['js', 'react', 'cloud', 'mac', 'knowledge', 'talk']
const categoryCheck = function (category) {
  return categoryList.some(function (el) {
    // console.log(el, category)
    return el === category
  })
}

const uri = 'articles'
//insert article
router.post('/', (req, res, next) => {
  const { category, title, content } = req.body

  if (categoryCheck(category)) {
    if (validate(title, content)) {
      const query = `INSERT INTO ${uri} (category, title, content) VALUES ('${category}', '${title}', '${content}');`;
      save(res, uri, query);
    } else {
      res.status(400).send(new ResBody(false, null, 'invalid body'))
    }
  } else {
    res.status(400).send(new ResBody(false, null, 'invalid category name'))
  }
});

//update article
router.put('/:id', (req, res, next) => {
  const { category, title, content } = req.body

  let titlePiece = ''
  if (title)
    titlePiece = `, title='${title}'`
  let contentPiece = ''
  if (content)
    contentPiece = `, content='${content}'`
  if (categoryCheck(category)) {
    const query = `UPDATE ${uri} SET category='${category}'${titlePiece}${contentPiece} WHERE id=${req.params.id}`;
    save(res, uri, query);
  } else {
    res.status(400).send(new ResBody(false, null, 'invalid category name'))
  }
});

module.exports = router;