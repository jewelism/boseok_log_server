var pool = require('../config/db')
const ResBody = require('../models/ResBody')
const Cache = require('../cache')

function find(res, cacheUri, { query, params}, id) {
  if (Cache[cacheUri]) {
    //return cache
    console.log('return cache :', cacheUri)
    res.status(200).send(new ResBody(true, Cache[cacheUri], `article found successfully in cache (${cacheUri})`))
    return true
  }

  pool.getConnection(function (err, connection) {
    if (err) {
      res.status(500).send('database connection failed');
      return false
    }

    // if (id && Cache.articles_all) { //get one by id from articles_all cache
    //   const beforeTime = Date.now()
    //   const data = Cache.articles_all.filter((el) => {
    //     return el.id == id
    //     // return el.id === parseInt(id)
    //   })
    //   const afterTime = Date.now()
    //   console.log('return cache filter by id from articles_all :', id)
    //   res.status(200).send(new ResBody(true, data, `article ${id} found successfully in cache (articles_all)`))
    //   return true
    // }

    try {
      connection.query(query, params, function (err, rows) {
        if (err) {
          console.log('an error during query', err)
          res.status(500).send(new ResBody(false, false, 'server error'))
          return false
        }
        console.log('return db rows')
        if (cacheUri)
          Cache[cacheUri] = rows //store in cache
        res.status(200).send(new ResBody(true, rows, 'article found successfully in DB'))
        return true
      })
    } finally {
      connection.release()
      return true
    }
  })
}

module.exports = find
