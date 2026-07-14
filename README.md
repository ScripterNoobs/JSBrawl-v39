# JSBrawl-v39
A Brawl Stars V39 private server core written in JavaScript.

This is a complete migration of the `v39lua` server system to the JavaScript core.

## Requirements
* [Node.JS](https://nodejs.org/)
* `sqlite3` npm package

## Setting up
1. Download/clone this repository.
2. Run `npm install` to install dependencies.
3. Start the server with `node index.js`.
4. Connect via port `9339` using a compatible client.

## Features & Implementation
- **Robust TCP Framing & Buffering**: Handles client packet fragmentation and coalescing correctly.
- **SQLite Database Manager**: Built-in player database (`Data/players.db`).
- **Complete Messages Handled**:
  - KeepAlive (10108)
  - LoginMessage (10101) & LoginOK (20104) / LoginFailed (20103)
  - GoHome (14109) & OwnHomeData (24101)
  - SetName (10212) & ChangeNameMessage (24111)
  - GetPlayerProfile (14113) & PlayerProfileMessage (24113)
  - PlayerStatusMessage (14366) & LobbyInfoMessage (23457)
