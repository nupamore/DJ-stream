
// modules
const express = require('express')


const router = express.Router()

router.get( '/:userId/:waveName', (req, res) => {

  res.send( req.params.waveName )
})

module.exports = router
