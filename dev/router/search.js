// modules
const express = require('express')
const mysql = require('mysql')
const db = require('../custom_modules/db.js')

const router = express.Router()

const query = {
  search : `
    SELECT WAVE_ID, WAVE_NAME, WAVE_DJ, WAVE_LIVE, WAVE_DESC, WAVE_LIVE, WAVE_IMG, WAVE_VIEW, DATE_FORMAT(WAVE_DT, '%Y/%m/%d') WAVE_DT
    FROM WAVE
    WHERE WAVE_NAME LIKE ? OR WAVE_DJ LIKE ?
    ORDER BY WAVE_LIVE DESC;`
}

//작품 검색
router.get( '/search', (req, res) => {
  const keyword = req.query.k
  const connection = mysql.createConnection( db.connectionInfo )
  connection.query( query.search, [`%${ keyword }%`, `%${ keyword }%`], ( err, rows, fields ) => {
      if( err ) throw err

      // 예시입니다!
      const waves = rows.map( x => {
          return {
            id: x.WAVE_ID,
            dj : x.WAVE_DJ,
            name : x.WAVE_NAME,
            desc : x.WAVE_DESC,
            img : x.WAVE_IMG,
            view : x.WAVE_VIEW,
            live : x.WAVE_LIVE,
            dt : x.WAVE_DT
          }
      })
      res.json( waves )
  })
})

module.exports = router
