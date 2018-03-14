var pool = require('../config/db')
const ResBody = require('../models/ResBody')
const Cache = require('../cache')

function find(res, uri, query){
  pool.getConnection(function (err, connection) {
    if(err){
      res.status(500).send('database connection failed');
      return false
    }
  
    if(Cache[uri]){ //return cache
      res.status(200).send(new ResBody(true, Cache[uri]))
      // console.log('cached res')
      return true
    }
  
    try {
      connection.query(query, function (err, rows) {
        if (err) {
          console.log('an error during query')
          res.status(500).send(new ResBody(false, false, err))
          return false
        }
        // console.log('query res')
        Cache[uri] = rows //store in cache
        res.status(200).send(new ResBody(true, rows, 'article found successfully'))
        return true
      })
    } finally {
      connection.release()
      return true
    }
  })
}

module.exports = find
