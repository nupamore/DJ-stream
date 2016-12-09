
// modules
const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql')
const db = require('../custom_modules/db.js')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))

const query = {
  follow : `
    INSERT INTO FOLLOW ( USER_ID, FOLLOW_DJ, FOLLOW_DT )
    VALUES ( ?, ?, NOW() );`,
  unfollow : `
    DELETE FROM FOLLOW
    WHERE USER_ID = ?
      AND FOLLOW_DJ = ?;`
}

router.post( '/follow', (req, res) => {
  const user = req.session.passport.user.id
  const dj = req.body.id
  const connection = mysql.createConnection( db.connectionInfo )
  connection.query( query.follow, [ user, dj ], ( err, result ) => {
    connection.end()
    if( err ) {
      console.log( err )
      res.sendStatus( 404 )
    }
    else {
      res.json( result )
    }
  })
})

router.delete( '/follow', (req, res) => {
  const user = req.session.passport.user.id
  const dj = req.body.id
  const connection = mysql.createConnection( db.connectionInfo )
  connection.query( query.unfollow, [ user, dj ], ( err, result ) => {
    connection.end()
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
