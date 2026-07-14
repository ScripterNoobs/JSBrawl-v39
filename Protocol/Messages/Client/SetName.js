const PiranhaMessage = require('../../PiranhaMessage')
const ChangeNameMessage = require('../Server/ChangeNameMessage')

class SetName extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10212
    this.version = 0
  }

  async decode () {
    this.name = this.readString()
    this.idk = this.readBoolean()
  }

  async process () {
    await new ChangeNameMessage(this.client, this.name).send()
  }
}

module.exports = SetName
