const RC4 = require('simple-rc4')
let config = {}
try {
  config = require('../config.json')
} catch (e) {}

const KEY = config.rc4key || 'fhsdjkiudoihfjsd'

class RC4Session {
  constructor () {
    this.encrypter = new RC4(KEY)
    this.encrypter.skip(1024)
    this.decrypter = new RC4(KEY)
    this.decrypter.skip(1024)
  }

  encrypt (buffer) {
    return this.encrypter.update(buffer)
  }

  decrypt (buffer) {
    return this.decrypter.update(buffer)
  }
}

module.exports = RC4Session
