const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const fs = require('fs')

const dbPath = path.join(__dirname, 'players.db')

if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })
}

const db = new sqlite3.Database(dbPath)

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS plrs (
    lowid INTEGER,
    token TEXT,
    name TEXT,
    trophies INTEGER,
    gold INTEGER,
    gems INTEGER,
    TvTW INTEGER,
    SW INTEGER,
    DW INTEGER,
    exp INTEGER,
    registered INTEGER
  )`)
})

function randomString (len) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let str = ''
  for (let i = 0; i < len; i++) {
    str += chars[Math.floor(Math.random() * chars.length)]
  }
  return str
}

const DBM = {
  getNewId () {
    return new Promise((resolve, reject) => {
      db.get('SELECT MAX(lowid) AS m FROM plrs', (err, row) => {
        if (err) return reject(err)
        resolve((row?.m || 0) + 1)
      })
    })
  },

  tokenExists (token) {
    return new Promise((resolve, reject) => {
      db.get('SELECT 1 FROM plrs WHERE token = ?', [token], (err, row) => {
        if (err) return reject(err)
        resolve(!!row)
      })
    })
  },

  async createAcc () {
    let token
    do {
      token = randomString(30)
    } while (await this.tokenExists(token))

    const lowid = await this.getNewId()
    const name = 'LuaPlayer'

    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        INSERT INTO plrs (lowid, token, name, trophies, gold, gems, TvTW, SW, DW, exp, registered)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      stmt.run(lowid, token, name, 0, 100, 500, 0, 0, 0, 0, 0, (err) => {
        stmt.finalize()
        if (err) return reject(err)
        resolve({
          lowid,
          token,
          name,
          trophies: 0,
          gold: 100,
          gems: 500,
          TvTW: 0,
          SW: 0,
          DW: 0,
          exp: 0,
          registered: 0,
        })
      })
    })
  },

  loadAcc (token) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM plrs WHERE token = ?', [token], (err, row) => {
        if (err) return reject(err)
        if (!row) return resolve(null)
        resolve({
          lowid: row.lowid,
          token: row.token,
          name: row.name,
          trophies: row.trophies,
          gold: row.gold,
          gems: row.gems,
          TvTW: row.TvTW,
          SW: row.SW,
          DW: row.DW,
          exp: row.exp,
          registered: row.registered,
        })
      })
    })
  },

  saveAcc (p) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        UPDATE plrs SET
          name = ?,
          trophies = ?,
          gold = ?,
          gems = ?,
          TvTW = ?,
          SW = ?,
          DW = ?,
          exp = ?,
          registered = ?
        WHERE lowid = ?
      `)
      stmt.run(
        p.name,
        p.trophies,
        p.gold,
        p.gems,
        p.TvTW,
        p.SW,
        p.DW,
        p.exp,
        p.registered,
        p.lowid,
        (err) => {
          stmt.finalize()
          if (err) return reject(err)
          resolve(true)
        },
      )
    })
  },

  editVal (player, column, value) {
    const allowed = {
      name: true,
      trophies: true,
      gold: true,
      gems: true,
      TvTW: true,
      SW: true,
      DW: true,
      exp: true,
      registered: true,
    }

    if (!allowed[column]) {
      return Promise.reject(new Error('not allowed column'))
    }

    player[column] = value

    return new Promise((resolve, reject) => {
      db.run(`UPDATE plrs SET ${column} = ? WHERE lowid = ?`, [value, player.lowid], (err) => {
        if (err) return reject(err)
        resolve(true)
      })
    })
  },
}

module.exports = DBM
