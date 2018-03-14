var express = require('express');
var router = express.Router();
var pool = require('../../config/db')
const ResBody = require('../../models/ResBody')

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  pool.getConnection(function (err, connection) {
    if (err) {
      res.status(500).send('database connection failed');
      return false
    }
    // console.log(req.params.id)
    let query
    if (req.params.id === 'list') {
      query = 'SELECT * from users'
    } else {
      query = `SELECT * from users where id=${req.params.id}`
    }
    try {
      connection.query(query, function (err, rows) {
        if (err) {
          console.log('an error')
          res.status(500).send(new ResBody());
          return false
        }

        res.status(200).send(new ResBody(true, rows))
      })
    } finally {
      connection.release()
    }
  })
});

module.exports = router;