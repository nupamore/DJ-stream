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

// 메인화면
router.get( '/', (req, res) => {
  res.send('main')
})

module.exports = router
