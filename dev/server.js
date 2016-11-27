
// modules
const fs = require('fs')
const express = require('express')
const app = express()
const http = require('http').Server( app )
const socket = require('./socket.js')
const ejs = require('ejs')


// express setting
app.use( express.static(`${ __dirname }/view`) )
app.use( '/lib', [
  express.static( `${ __dirname }/node_modules/jquery/dist` ),
  express.static( `${ __dirname }/node_modules/material-design-lite` ),
  express.static( `${ __dirname }/node_modules/vue/dist` ),
  express.static( `${ __dirname }/node_modules/p5/lib` ),
  express.static( `${ __dirname }/node_modules/socket.io-client` ),
])
app.set( 'view engine', 'ejs' )
app.set( 'port', 65007 )

// ajax 요청이 아닐 경우 html 전달
app.use( (req, res, next) => {
  if( !req.get('X-Requested-With') ){
    res.render( `${ __dirname }/view/index.ejs` )
  }
  else{
    next()
  }
})

// express router
app.use( require('./router/main.js') )
app.use( require('./router/join.js') )
app.use( require('./router/login.js') )
app.use( require('./router/follow.js') )
app.use( require('./router/support.js') )
app.use( require('./router/search.js') )
app.use( require('./router/user.js') )
app.use( require('./router/wave.js') )

// express open
http.listen( app.get('port'), () => {
  console.log( `Server running at ${ app.get('port') }` )
})

// socket open
socket.listen( http )
