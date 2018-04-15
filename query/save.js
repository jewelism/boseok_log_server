var pool = require('../config/db');
const ResBody = require('../models/ResBody');
const Cache = require('../cache');
const { clearCache } = require('../utils');

function save(res, cacheUri, query) {
  function responseErr(msg) {
    console.log(msg);
    res.status(500).send(new ResBody(false, false, msg));
  }

  pool.getConnection(function (err, connection) {
    try {
      if (err) {
        responseErr("database connection failed");
        return false
      }

      connection.query(`UPDATE article_version SET version=${Date.now()}; ${query};`, function (err, rows) {
        if (err) {
          console.warn('an error during query', err);
          responseErr(`server error : ${err}`);
          return false
        }

        clearCache()
        res.status(200).send(new ResBody(true, null, "article saved successfully"));
        return true
      })
    } finally {
      connection.release();
      return true;
    }
  })
}

module.exports = save
