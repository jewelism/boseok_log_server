var express = require('express');
var router = express.Router();
const save = require('../../query/save');
const ResBody = require('../../models/ResBody');

function responseErr(res, msg) {
  res.status(400).send(new ResBody(false, null, msg));
}

const uri = 'chats';
//insert chats
router.post('/', (req, res, next) => {
  const { text } = req.body;

  // console.log(text);
  if (text && text.trim()) {
    const query = `INSERT INTO ${uri} (author, text, time) VALUES ('익명', '${text}', ${Date.now()})`;
    save(res, uri, query);
  } else {
    responseErr(res, "invalid text => null or empty");
  }
});

module.exports = router;