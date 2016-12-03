
// modules
const socket = require('socket.io')


exports.listen = ( http ) => {
  const io = socket.listen( http )

  var userNames = []

  io.on( 'connection', ( socket ) => {
    socket.on( 'addUser', ( userName ) => {
      socket.userName = userName
      socket.room = 'waveName'
      userNames.push(userName)
      socket.join( socket.room )
      io.sockets.in( socket.room ).emit( 'chat', 'SERVER', socket.userName + '님이 입장하셨습니다. ')
      socket.emit( 'updateUser', userNames )
    })

    socket.on( 'sendChat', ( comment ) => {
      io.sockets.in( socket.room ).emit( 'chat', socket.userName, comment )
    })

    socket.on( 'disconnect', () => {
      userNames.splice( userNames.indexOf(socket.userName), 1 )
      io.sockets.emit( 'updateuser', userNames )
      socket.broadcast.in( socket.waveName ).emit( 'chat', 'SERVER', socket.userName + '님이 퇴장하셨습니다. ' )
      socket.leave( socket.room )
    })

  })
}
