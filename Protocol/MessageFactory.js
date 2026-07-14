const fs = require('fs')
const path = require('path')

class MessageFactory {
  constructor () {
    this.packets = {}

    try {
      const clientDir = path.join(__dirname, 'Messages', 'Client')
      const files = fs.readdirSync(clientDir)
      files.forEach(e => {
        if (!e.endsWith('.js')) return
        try {
          const Packet = require(`./Messages/Client/${e.replace('.js', '')}`)
          const packetClass = new Packet()
          this.packets[packetClass.id] = Packet
        } catch (err) {
          console.log(`[SERVER] >> A wild error while initializing "${e.replace('.js', '')}" packet!`)
          console.log(err)
        }
      })
    } catch (err) {
      console.log('[SERVER] >> Error reading client packets directory')
      console.log(err)
    }
  }

  handle (id) {
    return this.packets[id]
  }

  getPackets () {
    return Object.keys(this.packets)
  }
}

module.exports = MessageFactory
