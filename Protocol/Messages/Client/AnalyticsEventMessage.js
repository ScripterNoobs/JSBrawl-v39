const PiranhaMessage = require('../../PiranhaMessage')

class AnalyticsEventMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10110
    this.version = 0
  }

  async decode () {}
  async process () {}
}

module.exports = AnalyticsEventMessage
