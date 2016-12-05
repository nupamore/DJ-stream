
// modules
const express = require('express')
const auth = require('../custom_modules/auth.js')
const mysql = require('mysql')
const db = require('../custom_modules/db.js')


const router = express.Router()

const query = {
  //사용자 기본 정보 조회
  myInfo : `
    SELECT USER_ID, USER_NICKNAME, USER_IMG, USER_DT
    FROM USER
    WHERE USER_ID = ?;
  `,
  //사용자 등록
  createUser : `
    INSERT INTO USER(USER_ID, USER_TOKEN, USER_NICKNAME, USER_IMG, USER_DT)
    VALUES (?, ?, ?, '/img/user.png', NOW());
  `,
}

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

    // 가입했는지 확인
    const user = req.session.passport.user
    const connection = mysql.createConnection( db.connectionInfo )
    connection.query( query.myInfo, user.id, ( err, rows, fields ) => {
      if(err){
        console.log(err)
      }
      else if( rows.length ){
        console.log(rows)
        res.redirect('/')
      }
      else{
        join( user, (err, results) => {
          if(err){
            console.log(err)
          }
          res.redirect('/join')
        })
      }
    })
  }
)

router.get( '/me', (req, res) => {
  res.redirect( req.session.passport.user.id )
})

router.get( '/logout', (req, res) => {
  req.logout()
  res.sendStatus(200)
})


/**
 * 유저를 등록한다.
 * @param  {Object}   user     [유저정보]
 * @param  {Function} callback [콜백]
 * @return {sideEffect}
 */
const join = ( user, callback ) => {
  const connection = mysql.createConnection( db.connectionInfo )
  connection.query( query.createUser, [user.id, user.token, user.name], ( err, results ) => {
    callback( err, results )
  })
}

module.exports = router
