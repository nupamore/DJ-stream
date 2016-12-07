
// modules
const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql')
const async = require('async')
const db = require('../custom_modules/db.js')


const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))

const query = {
  //사용자 기본 정보 조회
  myInfo : `
    SELECT USER_ID, USER_NICKNAME, USER_IMG, USER_DT
    FROM USER
    WHERE USER_ID = ?; `,
  //나를 팔로우한 사용자 조회
  myFollower : `
    SELECT FOLLOW.USER_ID myfollower
    FROM USER, FOLLOW
    WHERE USER.USER_ID = FOLLOW.FOLLOW_DJ AND FOLLOW.FOLLOW_DJ = ?;
  `,
  //내가 팔로잉한 사용자 조회
  myFollowing : `
    SELECT FOLLOW.FOLLOW_DJ myfollowing
    FROM USER, FOLLOW
    WHERE USER.USER_ID = FOLLOW.USER_ID AND
          USER.USER_ID = ?  `,
  //내 작품 조회
  myWave : `
    SELECT WAVE.WAVE_ID id, WAVE.WAVE_DJ dj, WAVE.WAVE_NAME name, WAVE_LIVE live, WAVE.WAVE_DESC de, WAVE.WAVE_IMG img,  DATE_FORMAT(WAVE.WAVE_DT, '%Y/%m/%d') dt, WAVE.WAVE_VIEW view
    FROM USER, WAVE
    WHERE USER.USER_ID = WAVE.WAVE_DJ AND
          WAVE.WAVE_DJ = ?
    ORDER BY WAVE.WAVE_LIVE DESC;`,
  //내 정보 수정
  updateUser : `
    UPDATE USER
    SET USER_NICKNAME = ?
    WHERE USER_ID = ?`,
}



router.get( '/:userId', (req, res) => {
  const id = req.params.userId
  const connection = mysql.createConnection( db.connectionInfo )

  async.parallel([
    callback => {
      connection.query( query.myInfo, [id], ( err, rows, fields ) => {
        callback( err, rows )
      })
    },
    callback => {
      connection.query( query.myFollower, [id], ( err, rows, fields ) => {
        callback( err, rows )
      })
    },
    callback => {
      connection.query( query.myFollowing, [id], ( err, rows, fields ) => {
        callback( err, rows )
      })
    },
    callback => {
      connection.query( query.myWave, [id], ( err, rows, fields ) => {
        callback( err, rows )
      })
    }
  ], ( err, results ) => {
    if( err ){
      res.sendStatus(400)
    }

    else{
      const info = results[0][0]
      const follower = results[1]
      const following = results[2]
      const wave = results[3]

      if( !info ){
        res.sendStatus(404)
      }
      else{
        const user = {
          id : info.USER_ID,
          name : info.USER_NICKNAME,
          img : info.USER_IMG,
          dt : info.USER_DT,
          follower : follower.map( x => ({
            name : x.myfollower
          })),
          following : following.map( x => ({
            name : x.myfollowing
          })),
          waves : wave.map( x => ({
            id : x.id,
            dj : x.dj,
            name : x.name,
            desc : x.de,
            img : x.img,
            view : x.view,
            live : x.live,
            dt : x.dt
          }))
        }
        res.json( user )
      }
    }
  })
})


router.put( '/:userId', (req, res) => {
  const id = req.session.passport.user.id
  const name = req.body.name

  const connection = mysql.createConnection( db.connectionInfo )
  connection.query( query.updateUser, [name, id], ( err, results ) => {
    if(err){
      console.log(err)
      res.sendStatus(400)
    }
    else{
      res.sendStatus(200)
    }
  })
})


module.exports = router
