
// modules
const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql')
const multer = require('multer')
const db = require('../custom_modules/db.js')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))

router.post( '/upload',
  multer({ dest: `${ __dirname }/../files`}).single('file'),
  (req,res) => {
    res.send( req.file )
  }
)

module.exports = router
