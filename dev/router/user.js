
// modules
const express = require('express')
const mysql = require('mysql')

const router = express.Router()
const connectionInfo = {
  host : 'nupa.fun25.co.kr',
  port : 17904,
  user : 'hyerim',
  password : 'rimhye',
  database : 'djstream'
}

const query = {
  searchByUserId : `
    SELECT USER_NICKNAME, USER_IMG, USER_TYPE
    FROM USER
    WHERE USER_ID = ?
    ;`,
  searchByWaveName : `
    SELECT WAVE_DJ, WAVE_NAME, WAVE_DESC, WAVE_LIVE, WAVE_IMG, WAVE_VIEW, WAVE_DT
    FROM WAVE
    WHERE WAVE_DJ = ? AND WAVE_NAME = ?
    ;`
}

router.get( '/:userId', (req, res) => {
  const id = req.query.userId
  const connection = mysql.createConnection( connectionInfo )
  connection.query( query.searchByUserId, ['userid'], ( err, rows, fields ) => {

  })
})

router.get( '/:userId/:waveName', (req, res) => {
  const id = req.query.userId
  const waveName = req.query.waveName
  const connection = mysql.createConnection ( connectionInfo )
  connection.query( query.searchByWaveName, ['userid', 'waveName'],( err, rows, fields ) => {

  })
})

module.exports = router
