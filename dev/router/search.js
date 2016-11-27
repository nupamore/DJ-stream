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
  search : `
    SELECT WAVE_NAME, WAVE_DJ, WAVE_DESC, WAVE_LIVE, WAVE_IMG, WAVE_VIEW, WAVE_DT
    FROM WAVE
    WHERE WAVE_NAME LIKE ? OR WAVE_DJ LIKE ? ;`
}

//작품 검색
router.get( '/search', (req, res) => {
  const keyword = req.query.k
  const connection = mysql.createConnection( connectionInfo )
  connection.query( query.search, [`%${ keyword }%`, `%${ keyword }%`], ( err, rows, fields ) => {
      if( err ) throw err

      // 예시입니다!
      const waves = [
        {
          id: 5,
          dj: 'hyerim',
          name: 'yo',
          desc: 'check it out',
          img: '/img/logo.png',
          view: 123,
          dt: '2016-11-27',
        }
      ]
      res.json( waves )
  })
})

module.exports = router
