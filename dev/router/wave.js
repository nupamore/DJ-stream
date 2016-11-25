// modules
const express = require('express')
const mysql = require('mysql')

const router = express.Router()
const connectionInfo = {
  host : 'localhost',
  user : '7team',
  password : process.argv[2],
  database : '7team'
}

const query = {
  search : `
    SELECT WAVE_NAME, WAVE_DJ, WAVE_NAME, WAVE_DESC, WAVE_LIVE, WAVE_IMG, WAVE_VIEW, WAVE_DT
    FROM WAVE
    WHERE WAVE_NAME LIKE ? ;`
}

//작품 검색
router.get( '/search', (req, res) => {
  const keyword = req.query.k
  const connection = mysql.createConnection( connectionInfo )
  connection.query( query.search, [keyword], ( err, rows, fields ) => {
      if( err ) throw err
      res.json( rows )
  })
})

//
router.get( '/:userId/:waveName', (req, res) => {

  res.send( req.params.waveName )
})

module.exports = router
