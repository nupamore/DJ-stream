// modules
const express = require('express')
const mysql = require('mysql')

const router = express.Router()
const connection = mysql.createConnection({
  host : 'localhost',
  user : '7team',
  password : process.argv[2],
  database : '7team'
})

const query = {
  search : `
    SELECT WAVE_NAME, WAVE_DJ, WAVE_NAME, WAVE_DESC, WAVE_LIVE, WAVE_IMG, WAVE_VIEW, WAVE_DT
    FROM WAVE
    WHERE WAVE_NAME LIKE ? ;`
}

//작품 검색
router.get( '/search', (req, res) => {
  const keyword = req.query.k
  connection.connect()
  connection.query( query.search, [keyword], ( err, rows, fields ) => {
      if( err ) throw err
      res.json( rows )
  })
  connection.end()
})

//
router.get( '/:userId/:waveName', (req, res) => {

  res.send( req.params.waveName )
})

module.exports = router
