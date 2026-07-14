const PiranhaMessage = require('../../PiranhaMessage')

class LoginFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20103
    this.client = client
    this.version = 0
  }

  async encode () {
    this.writeInt(1)
    this.writeString(null)
    this.writeString(null)
    this.writeString(null)
    this.writeString(null)
    this.writeString('LUA BRAWL V39 - by batu')
    this.writeInt(0)
    this.writeBoolean(false)
    this.writeBytes(null)
    this.writeInt(0)
    this.writeInt(0)
    this.writeInt(0)
    this.writeString(null)
    this.writeInt(0)
    this.writeByte(3)
    this.writeStringReference(null)
    this.writeVInt(0)
    this.writeStringReference(null)
    this.writeBoolean(false)
  }
}

module.exports = LoginFailedMessage
