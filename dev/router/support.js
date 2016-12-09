
// modules
const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql')
const db = require('../custom_modules/db.js')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))

const query = {
  support : `
    INSERT INTO SUPPORT ( USER_ID, SUPPORT_DJ, SUPPORT_DT )
    VALUES ( ?, ?, NOW() );`
}

router.post( '/support', (req, res) => {
  const user = req.session.passport.user.id
  const dj = req.body.id
  const connection = mysql.createConnection( db.connectionInfo )
  connection.query( query.support, [ user, dj ], ( err, result ) => {
      if( err ) {
        console.log( err )
        res.sendStatus( 404 )
      }
      else {
        res.json( result )
      }
  })
})

module.exports = router
