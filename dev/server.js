
// modules
const fs = require('fs')
const ejs = require('ejs')
const express = require('express')
const app = express()
const http = require('http').Server( app )
const socket = require('./socket.js')
const auth = require('./custom_modules/auth.js')


// express setting
app.set( 'view engine', 'ejs' )
app.set( 'port', 65007 )
app.use(
  auth.session({
    secret: 'DJ-stream'
  })
)
app.use( auth.passport.initialize(nn) )
app.use( auth.passport.session() )

// express static
//
app.use( express.static(`${ __dirname }/view`) )
app.use( '/files', express.static(`${ __dirname }/files`) )
app.use( '/lib', [
  express.static( `${ __dirname }/node_modules/jquery/dist` ),
  express.static( `${ __dirname }/node_modules/material-design-lite` ),
  express.static( `${ __dirname }/node_modules/vue/dist` ),
  express.static( `${ __dirname }/node_modules/p5/lib` ),
  express.static( `${ __dirname }/node_modules/socket.io-client` ),
])

app.use( (req, res, next) => {
  // 로그인
  if( req.path == '/login' || req.path == '/login/callback' ){
    next()
  }
  // ajax 요청이 아닐 경우 html 전달
  else if( !req.get('X-Requested-With') ){
    res.render( `${ __dirname }/view/index.ejs`, {
      user: req.user
    })
  }
  else{
    next()
  }
})

// express router
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
