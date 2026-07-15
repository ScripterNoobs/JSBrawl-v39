const net = require('net')
const MessageFactory = require('./Protocol/MessageFactory')
const RC4Session = require('./RC4')
const server = new net.Server()
const Messages = new MessageFactory()

let config = {}
try {
  config = require('./config.json')
} catch (e) {}

const HOST = config.host || '0.0.0.0'
const PORT = config.port || 9339

server.on('connection', async (client) => {
  client.setNoDelay(true)
  client.log = function (text) {
    return console.log(`[${this.remoteAddress.split(':').slice(-1)}] >> ${text}`)
  }

  client.log('A wild connection appeard!')

  const packets = Messages.getPackets()

  client.buffer = Buffer.alloc(0)
  client.joined = false
  client.player = null
  client.rc4 = new RC4Session()

  client.on('data', async (chunk) => {
    client.buffer = Buffer.concat([client.buffer, chunk])

    while (client.buffer.length >= 7) {
      const id = client.buffer.readUInt16BE(0)
      const len = client.buffer.readUIntBE(2, 3)
      const version = client.buffer.readUInt16BE(5)

      if (client.buffer.length < 7 + len) {
        break
      }

      let payload = client.buffer.slice(7, 7 + len)
      client.buffer = client.buffer.slice(7 + len)

      if (id !== 10100) {
        payload = client.rc4.decrypt(payload)
      }

      if (id === 10101 && !client.joined) {
        client.joined = true
        client.log('joined')
      }

      if (packets.indexOf(String(id)) !== -1) {
        try {
          const Packet = Messages.handle(id)
          const packetInstance = new Packet(payload, client)
          packetInstance.version = version

          client.log(`Gotcha ${id} (${packetInstance.constructor.name}) packet!`)

          await packetInstance.decode()
          await packetInstance.process()
        } catch (e) {
          console.log(e)
        }
      } else {
        client.log(`Gotcha undefined ${id} packet!`)
      }
    }
  })

  client.on('end', async () => {
    return client.log('Client disconnected.')
  })

  client.on('error', async error => {
    try {
      client.log('A wild error!')
      console.log(error)
      client.destroy()
    } catch (e) { }
  })
})

server.once('listening', () => {
  console.log(`
   _____      _          ____   _____ 
  / ___/___  / /___     / __ ) / ___/ 
  \\__ \\/ _ \\/ / __ \\   / __  | \\__ \\  
 ___/ /  __/ / /_/ /  / /_/ / ___/ /  
/____/\\___/_/\\____/  /_____/ /____/   
  `)
  console.log(`[SERVER] >> Server started on ${HOST}:${PORT}!`)
})
server.listen(PORT, HOST)

process.on('uncaughtException', e => console.log(e))

process.on('unhandledRejection', e => console.log(e))
