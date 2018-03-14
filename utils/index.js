module.exports.validate = function (...params) {
  let result = true
  params.map((param) => {
    if (!param) { //invalid=> param==undefined
      result = false
    }
  })
  return result
}