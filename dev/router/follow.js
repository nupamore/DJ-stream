
// modules
const express = require('express')
const bodyParser = require('body-parser');
const express = require('mysql')

const jsonParser = bodyParser.json({
  type : 'application/*+json'
})
const router = express.Router()

const connectionInfo = {
  host : 'nupa.fun25.co.kr',
  port : 17904,
  user : 'hyerim',
  password : 'rimhye',
  database : 'djstream'
}

const query = {
  follow : `
    INSERT INTO FOLLOW ( USER_ID, FOLLOW_DJ, FOLLOW_DT )
    VALUES ( ?,  ?, NOW() );`
}

router.post( '/follow', jsonParser, (req, res) => {
  const user = req.body.me
  const dj = req.body.dj
  const connection = mysql.createConnection( connectionInfo )
  connection.query( query.follow, [ user, dj ], ( err, result ) => {
      if( err ) {
        res.sendStatus( 404 )
      }
      else {
        res.json( result )
      }
  })
})

module.exports = router
