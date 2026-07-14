const PiranhaMessage = require('../../PiranhaMessage')

class LoginOK extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20104
    this.client = client
    this.version = 0
  }

  async encode () {
    const player = this.client.player
    if (!player) {
      console.log('lgnokmsg CLIENT NOT FOUND')
    }

    const lowid = player ? player.lowid : 0
    const token = player ? player.token : ''

    this.writeInt(lowid)
    this.writeInt(lowid)
    this.writeInt(lowid)
    this.writeInt(lowid)
    this.writeString(token)
    this.writeString('')
    this.writeString('')
    this.writeInt(39)
    this.writeInt(110)
    this.writeInt(1)
    this.writeString('dev')
    this.writeInt(0)
    this.writeInt(0)
    this.writeInt(0)
    this.writeString('')
    this.writeString('')
    this.writeString('')
    this.writeInt(0)
    this.writeString('')
    this.writeString('TR')
    this.writeString('')
    this.writeInt(2)
    this.writeString('')
    this.writeInt(2)
    this.writeString('https://game-assets.brawlstarsgame.com')
    this.writeString('http://a678dbc1c015a893c9fd-4e8cc3b1ad3a3c940c504815caefa967.r87.cf2.rackcdn.com')
    this.writeInt(2)
    this.writeString('https://event-assets.brawlstars.com')
    this.writeString('https://24b999e6da07674e22b0-8209975788a0f2469e68e84405ae4fcf.ssl.cf2.rackcdn.com/event-assets')
    this.writeVInt(0)
    this.writeCompressedString('')
    this.writeBoolean(true)
    this.writeString('')
    this.writeString('')
    this.writeString('')
    this.writeString('https://play.google.com/store/apps/details?id=com.supercell.brawlstars')
    this.writeString('')
    this.writeBoolean(false)
  }
}

module.exports = LoginOK
