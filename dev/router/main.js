
// node_modules
const express = require('express')
const bodyParser = require('body-parser')

// class
const User = require('../class/User.js')


const router = express.Router()
router.get( '/test', (req, res) => {
  const p = new User( 'Hong gildong' )
  res.send( p.familyName )
})

module.exports = router
