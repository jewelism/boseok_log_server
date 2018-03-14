class ResBody {
  constructor(status, data, msg){
    this.status = status || false
    this.data = data || []
    this.msg = msg || ''
  }
}

module.exports = ResBody