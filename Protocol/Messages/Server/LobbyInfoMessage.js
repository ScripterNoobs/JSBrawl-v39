const PiranhaMessage = require('../../PiranhaMessage')

class LobbyInfoMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 23457
    this.client = client
    this.version = 0
  }

  async encode () {
    const player = this.client.player
    if (!player) {
      console.log('CLIENT NOT FOUND')
    }

    const lowid = player ? player.lowid : 0
    const str = `LuaBrawl V39\nby batu\nYour lowid: ${lowid}\nhttps://github.com/BatuKvi123/LuaBrawl-V39\n${'^'.repeat(30)} STAR MY REPO PLS!${'\n'.repeat(80)}`

    this.writeVInt(1)
    this.writeString(str)
    this.writeVInt(0)
  }
}

module.exports = LobbyInfoMessage
