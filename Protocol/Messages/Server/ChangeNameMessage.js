const PiranhaMessage = require('../../PiranhaMessage')
const DBM = require('../../../Data/DBM')

class ChangeNameMessage extends PiranhaMessage {
  constructor (client, name) {
    super()
    this.id = 24111
    this.client = client
    this.name = name
    this.version = 0
  }

  async encode () {
    const player = this.client.player
    if (!player) {
      console.log('CLIENT NOT FOUND')
    } else {
      await DBM.editVal(player, 'registered', 1)
      await DBM.editVal(player, 'name', this.name)
    }

    this.writeVInt(201)
    this.writeString(this.name)
    this.writeVInt(0)
    this.writeVInt(1)
    this.writeVInt(2)
    this.writeVInt(3)
    this.writeVInt(4)
    this.writeVInt(5)
  }
}

module.exports = ChangeNameMessage
