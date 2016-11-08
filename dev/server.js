
// node_modules
const express = require('express')


// express setup
const app = express()
app.use( express.static(__dirname + '/view') )

// express router
app.use( '/main', require('./router/main.js') )


const port = 80;
app.listen( port, () => {
  console.log( `Server running at ${ port }` )
})
