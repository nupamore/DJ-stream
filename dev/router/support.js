
// modules
const express = require('express')


const router = express.Router()

router.get( '/support', (req, res) => {
  res.send( 'test' )
})

module.exports = router
