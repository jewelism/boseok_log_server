const router = require('express').Router();
const save = require('../../query/save');
const ResBody = require('../../models/ResBody');

function responseErr(res, msg) {
  res.status(400).send(new ResBody(false, null, msg));
}

const uri = 'chats';
//insert chats
router.post('/', (req, res, next) => {
  const { author, text, ip } = req.body;

  // console.log(text);
  if (text && text.trim()) {
    const query = `INSERT INTO ${uri} (author, text, ip) VALUES ('${author}', '${text}', '${ip}')`;
    save(res, uri, query);
  } else {
    responseErr(res, "invalid text => null or empty");
  }
});

module.exports = router;