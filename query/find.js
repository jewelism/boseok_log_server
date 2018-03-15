var pool = require('../config/db')
const ResBody = require('../models/ResBody')
const Cache = require('../cache')

function find(res, cacheUri, query){
  pool.getConnection(function (err, connection) {
    if(err){
      res.status(500).send('database connection failed');
      return false
    }
  
    if(Cache[cacheUri]){ 
      //return cache
      res.status(200).send(new ResBody(true, Cache[cacheUri], 'article found successfully in cache'))
      console.log('return cache', cacheUri)
      return true
    }
  
    try {
      connection.query(query, function (err, rows) {
        if (err) {
          console.log('an error during query', err)
          res.status(500).send(new ResBody(false, false, 'server error'))
          return false
        }
        console.log('return db rows')
        if(cacheUri)
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
