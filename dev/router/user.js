
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
  userId : `
    SELECT USER_NICKNAME, USER_IMG, USER_TYPE
    FROM USER
    WHERE USER_ID = ?
    ;`
}

router.get( '/:userId', (req, res) => {
  const id = req.query.userId
  const connection = mysql.createConnection( connectionInfo )
  connection.query( query.userId, [id], ( err, rows, fields ) => {
    if( err ) throw err
    res.json( rows )
  })
})


module.exports = router
