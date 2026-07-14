const PiranhaMessage = require('../../PiranhaMessage')
const PlayerProfileMessage = require('../Server/PlayerProfileMessage')

class GetPlayerProfile extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14113
    this.version = 0
  }

  async decode () {
    this.a = this.readVInt()
    this.plrID = this.readVInt()
  }

  async process () {
    await new PlayerProfileMessage(this.client).send()
  }
}

module.exports = GetPlayerProfile
