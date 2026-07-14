const PiranhaMessage = require('../../PiranhaMessage')
const DBM = require('../../../Data/DBM')
const LoginOK = require('../Server/LoginOK')
const OwnHomeData = require('../Server/OwnHomeData')
const LobbyInfoMessage = require('../Server/LobbyInfoMessage')

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class LoginMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10101
    this.version = 0
  }

  async decode () {
    this.HighID = this.readInt()
    this.LowID = this.readInt()
    this.Token = this.readString()
    this.maj = this.readInt()
    this.minor = this.readInt()
    this.build = this.readInt()
    this.fingprint = this.readString()
  }

  async process () {
    let acc
    if (this.Token && this.Token !== '') {
      acc = await DBM.loadAcc(this.Token)
    }

    if (!acc) {
      acc = await DBM.createAcc()
    }

    this.client.player = acc

    await new LoginOK(this.client).send()
    await new OwnHomeData(this.client).send()
    await wait(2000)
    await new LobbyInfoMessage(this.client).send()
  }
}

module.exports = LoginMessage
