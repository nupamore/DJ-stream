
// modules
const express = require('express')


const router = express.Router()

router.get( '/:userId', (req, res) => {

  res.send( req.params.userId )
})

module.exports = router
