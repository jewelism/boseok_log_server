const router = require('express').Router();
const ResBody = require('../../models/ResBody');
const promises = require('../../promises');

router.get('/', (req, res, next) => {
  promises.readFile(req.query.filename)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.warn(err);
      res.status(500).send(new ResBody(false, err, 'fail'));
    });
});

module.exports = router;