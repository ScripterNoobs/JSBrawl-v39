const PiranhaMessage = require('../../PiranhaMessage')

class PlayerProfileMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24113
    this.client = client
    this.version = 0
  }

  async encode () {
    const player = this.client.player
    if (!player) {
      console.log('CLIENT NOT FOUND')
    }

    const lowid = player ? player.lowid : 0
    const trophies = player ? player.trophies : 0
    const TvTW = player ? player.TvTW : 0
    const exp = player ? player.exp : 0
    const SW = player ? player.SW : 0
    const DW = player ? player.DW : 0
    const name = player ? player.name : ''

    this.writeVInt(lowid)
    this.writeVInt(lowid)
    this.writeVInt(0)
    this.writeVInt(0)
    this.writeVInt(15)

    this.writeVInt(1)
    this.writeVInt(TvTW)

    this.writeVInt(2)
    this.writeVInt(exp)

    this.writeVInt(3)
    this.writeVInt(trophies)

    this.writeVInt(4)
    this.writeVInt(trophies)

    this.writeVInt(5)
    this.writeVInt(1)

    this.writeVInt(8)
    this.writeVInt(SW)

    this.writeVInt(11)
    this.writeVInt(DW)

    this.writeVInt(9)
    this.writeVInt(0)

    this.writeVInt(12)
    this.writeVInt(0)

    this.writeVInt(13)
    this.writeVInt(100)

    this.writeVInt(14)
    this.writeVInt(0)

    this.writeVInt(15)
    this.writeVInt(0)

    this.writeVInt(16)
    this.writeVInt(0)

    this.writeVInt(18)
    this.writeVInt(0)

    this.writeVInt(17)
    this.writeVInt(0)

    this.writeString(name)
    this.writeVInt(100)

    this.writeVInt(28000001)
    this.writeVInt(43000001)
    this.writeVInt(-64)

    this.writeVInt(0)
    this.writeVInt(0)
  }
}

module.exports = PlayerProfileMessage
