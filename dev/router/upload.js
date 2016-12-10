
// modules
const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql')
const multer = require('multer')
const db = require('../custom_modules/db.js')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))

const query = {
  support : `
    INSERT INTO SUPPORT ( USER_ID, SUPPORT_DJ, SUPPORT_DT )
    VALUES ( ?, ?, NOW() );`
}

router.post( '/upload',
  multer({ dest: `${ __dirname }/../files`}).single('file'),
  (req,res) => {
    console.log(req.body) //form fields
    console.log(req.file) //form files
    res.sendStatus(200)
  }
)

module.exports = router
