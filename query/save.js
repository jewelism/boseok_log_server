var pool = require('../config/db')
const ResBody = require('../models/ResBody')
const Cache = require('../cache')
const { clearCache } = require('../utils')

function save(res, cacheUri, query) {
  pool.getConnection(function (err, connection) {
    if (err) {
      res.status(500).send('database connection failed');
      return false
    }

    try {
      connection.query(`UPDATE article_version SET version=${Date.now()}; ${query};`, function (err, rows) {
        if (err) {
          console.log('an error during query', err)
          res.status(500).send(new ResBody(false, false, 'server error'))
          return false
        }

        clearCache()
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
