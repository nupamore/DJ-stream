
// modules
const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql')
const db = require('../custom_modules/db.js')

const jsonParser = bodyParser.json({
  type : 'application/*+json'
})
const router = express.Router()

const query = {
  support : `
    INSERT INTO SUPPORT ( USER_ID, SUPPORT_DJ, SUPPORT_DT )
    VALUES ( ?, ?, NOW() );`
}

router.get( '/support', jsonParser, (req, res) => {
  const user = req.body.me
  const dj = req.body.dj
  const connection = mysql.createConnection( db.connectionInfo )
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
