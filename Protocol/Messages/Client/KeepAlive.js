const PiranhaMessage = require('../../PiranhaMessage')

class KeepAlive extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10108
    this.version = 0
  }

  async decode () {}
  async process () {}
}

module.exports = KeepAlive
