var pool = require('../config/db')
const ResBody = require('../models/ResBody')
const Cache = require('../cache')

function save(res, uri, query) { //uri => for cache
  pool.getConnection(function (err, connection) {
    if (err) {
      res.status(500).send('database connection failed');
      return false
    }

    try {
      connection.query(query, function (err, rows) {
        if (err) {
          console.log('an error during query')
          res.status(500).send(new ResBody(false, false, err))
          return false
        }

        Cache[uri] = null //remove cache
        res.status(200).send(new ResBody(true, null, "article saved successfully"))
        return true
      })
    } finally {
      connection.release()
      return true
    }
  })
}

module.exports = save
