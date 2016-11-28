
// modules
const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql')

const jsonParser = bodyParser.json({
  type : 'application/*+json'
})
const router = express.Router()

const connectionInfo = {
  host : 'nupa.fun25.co.kr',  port : 17904,
  user : 'hyerim',
  password : 'rimhye',
  database : 'djstream'
}


const query = {
  wave : `
    INSERT INTO WAVE ( WAVE_DJ, WAVE_NAME, WAVE_DESC, WAVE_LIVE, WAVE_IMG, WAVE_DT )
    VALUES ( ?, ?, ?, TRUE, ?, NOW());`
  }


router.post( '/:userId/:waveName', jsonParser, (req, res) => {
  const dj = req.params.userId
  const waveName = req.params.waveName
  const connection = mysql.createConnection( connectionInfo )
  const description = 'abc'
  const imgPath = 'abc'
  connection.query( query.wave, [ dj, waveName,  description, imaPath ], ( err, result ) => {
      if( err ) {
        res.sendStatus( 404 )
      }
      else {
        res.json( result )
      }
  })
})

module.exports = router
