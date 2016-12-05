
// modules
const socket = require('socket.io')


exports.listen = ( http ) => {
  const io = socket.listen( http )

  var userNames = []
  var levels = {
    mix : 0,
    left : 0,
    right : 0
  }

  io.on( 'connection', ( socket ) => {
    socket.on( 'addUser', ( userName, waveId ) => {
      socket.userName = userName
      socket.room = waveId
      userNames.push(userName)
      socket.join( socket.room )
      io.sockets.in( socket.room ).emit( 'chat', 'SERVER', socket.userName + '님이 입장하셨습니다. ')
      io.sockets.emit( 'updateUser', userNames )
    })

    socket.on( 'sendChat', ( comment ) => {
      io.sockets.in( socket.room ).emit( 'chat', socket.userName, comment )
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
