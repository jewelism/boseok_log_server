'use strict';
const Cache = require('../cache')

module.exports.validate = function (...params) {
  let result = true
  params.map((param) => {
    if (!param) { //invalid=> param==undefined
      result = false
    }
  })
  return result
}

module.exports.clearCache = function () {
  Object.getOwnPropertyNames(Cache).map((prop) => {
    Cache[prop] = null
    // console.log('cache cleaned, cache:', Cache[prop])
  })
}