
// modules
const express = require('express')
const mysql = require('mysql')
const db = require('../custom_modules/db.js')

const router = express.Router()

const query = {
  eventList : `
  SELECT EVENT_TARGET target, EVENT_TYPE type, EVENT_VALUE value, EVENT_TIME frame
  FROM EVENT
  WHERE WAVE_ID = ?; `
}

router.get( '/event/:eventId', (req, res) => {
  const id = req.params.eventId

  const connection = mysql.createConnection( db.connectionInfo )
  connection.query( query.eventList, [ id ], ( err, rows ) => {
      if( err ) {
        console.log( err )
        res.sendStatus( 404 )
      }
      else {
        res.json( rows )
      }
  })
})

module.exports = router
