
// modules
const socket = require('socket.io')
const mysql = require('mysql')
const db = require('./custom_modules/db.js')

const query = {
  findWave: `
    SELECT WAVE_ID
    FROM WAVE
    WHERE WAVE_NAME = ?;`,
  findUser: `
    SELECT USER_ID
    FROM USER
    WHERE USER_NICKNAME = ?;`,
  newChat: `
    INSERT INTO CHAT(USER_ID, WAVE_ID, CHAT_COMMENT, CHAT_DT)
    VALUES( ?, ?, ?, NOW());`
}

exports.listen = ( http ) => {
  const io = socket.listen( http )

  var userNames = []
  var levels = {
    mix : 0,
    left : 0,
    right : 0,
    playL : 'pause',
    playR : 'pause'
  }

  io.on( 'connection', ( socket ) => {
    socket.on( 'addUser', ( userName, waveId ) => {
      socket.userName = userName
      socket.room = waveId
      userNames.push(userName)
      socket.join( socket.room )
      io.sockets.in( socket.room ).emit( 'chat', 'SERVER', socket.userName + '님이 입장하셨습니다. ')
      io.sockets.emit( 'updateUser', userNames )

      const connection = mysql.createConnection( db.connectionInfo )
      connection.query( query.findWave, [ socket.room ], ( err, rows, fields ) => {
        if( err || !rows ) {
          console.log(err)
        }
        else {
          socket.waveID = rows[0].WAVE_ID

        }
      })
      connection.query( query.findUser, [ socket.userName ], ( err, rows, fields ) => {
        if( err || !rows ) {
          console.log(err)
        }
        else {
          socket.userID = rows[0].USER_ID
        }
      })
    })

    socket.on( 'sendChat', ( comment ) => {
      io.sockets.in( socket.room ).emit( 'chat', socket.userName, comment )

      const connection = mysql.createConnection( db.connectionInfo )
      connection.query( query.newChat, [socket.userID, socket.waveID, comment], ( err, result ) => {
        if( err ) {
          console.log(err)
        }
      })
    })

    socket.on( 'setLevels', ( key, level ) => {
      switch ( key ) {
        case 'mix':
          levels.mix = level
          break
        case 'left':
          levels.left = level
          break
        case 'right':
          levels.right = level
          break
        case 'playL':
          levels.playL = level
          break
        case 'playR':
          levels.playR = level
          break
      }
      io.sockets.in( socket.room ).emit( 'getLevels', levels )
    })

    socket.on( 'disconnect', () => {
      userNames.splice( userNames.indexOf(socket.userName), 1 )
      io.sockets.emit( 'updateuser', userNames )
      socket.broadcast.in( socket.waveName ).emit( 'chat', 'SERVER', socket.userName + '님이 퇴장하셨습니다. ' )
      socket.leave( socket.room )
    })

  })
}
