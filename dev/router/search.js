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
    SELECT WAVE_ID, WAVE_NAME, WAVE_DJ, WAVE_DESC, WAVE_LIVE, WAVE_IMG, WAVE_VIEW, WAVE_DT
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
      const waves = rows.map( x => {
          return {
            id: x.WAVE_ID,
            dj : x.WAVE_DJ,
            name : x.WAVE_NAME,
            desc : x.WAVE_DESC,
            img : x.WAVE_IMG,
            view : x.WAVE_VIEW,
            dt : x.WAVE_DT
          }
      })
      res.json( waves )
  })
})

module.exports = router
