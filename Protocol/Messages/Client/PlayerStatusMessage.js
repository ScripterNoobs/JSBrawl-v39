const PiranhaMessage = require('../../PiranhaMessage')

class PlayerStatusMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14366
    this.version = 0
  }

  async decode () {
    this.plrping = this.readVInt()
  }

  async process () {
    console.log(`status of ${this.client.remoteAddress}:${this.client.remotePort}: ${this.plrping}`)
  }
}

module.exports = PlayerStatusMessage
