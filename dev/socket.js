
// modules
const socket = require('socket.io')


exports.listen = ( http ) => {
  const io = socket.listen( http )

  io.on( 'connection', ( socket ) => {
    console.log( 'user connected' )

    socket.on( 'disconnect', () => {
      console.log( 'user disconnected' )
    })

    socket.on( 'adduser', ( userName ) => {
      console.log( userName )
    })
  })
}
