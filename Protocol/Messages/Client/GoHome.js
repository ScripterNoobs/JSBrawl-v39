const PiranhaMessage = require('../../PiranhaMessage')
const OwnHomeData = require('../Server/OwnHomeData')
const LobbyInfoMessage = require('../Server/LobbyInfoMessage')

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class GoHome extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14109
    this.version = 0
  }

  async decode () {}

  async process () {
    await new OwnHomeData(this.client).send()
    await wait(2000)
    await new LobbyInfoMessage(this.client).send()
  }
}

module.exports = GoHome
