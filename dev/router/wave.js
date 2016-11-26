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


router.get( '/:userId/:waveName', (req, res) => {

  res.send( req.params.waveName )
})

module.exports = router
