
// modules
const express = require('express')
const auth = require('../custom_modules/auth.js')


const router = express.Router()

router.get( '/login',
  auth.passport.authenticate('naver', null),
  (req, res) => {
  	console.log('/auth/naver failed, stopped');
  }
)

router.get( '/login/callback',
  auth.passport.authenticate('naver', {
    failureRedirect: '/intro'
  }),
  (req, res) => {
    res.redirect('/join')
  }
)

module.exports = router
