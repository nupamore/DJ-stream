
// modules
const express = require('express')


const router = express.Router()

router.get( '/follow', (req, res) => {
  res.send( 'test' )
})

module.exports = router
