
// modules
const express = require('express')
const mysql = require('mysql')

const router = express.Router()
const connectionInfo = {
  host : 'nupa.fun25.co.kr',
  port : 17904,
  user : 'hyerim',
  password : 'rimhye',
  database : 'djstream'
}

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
    SELECT WAVE.WAVE_ID id, WAVE.WAVE_DJ dj. WAVE.WAVE_NAME name, WAVE.WAVE_DESC desc, WAVE.WAVE_IMG img, WAVE.WAVE_DT dt, WAVE.WAVE_VIEW view
    FROM USER, WAVE
    WHERE USER.USER_ID = WAVE.WAVE_DJ AND WAVE.WAVE_DJ = ?; `
}



router.get( '/:userId', (req, res) => {
  const id = req.query.userId
  const connection = mysql.createConnection( connectionInfo )
  const user = []
  connection.query( query.myInfo, [id], ( err, rows, fields ) => {
    if( err ) throw err
<<<<<<< HEAD
    user = rows.map( x => {
      return {
        name : x.USER_NICKNAME,
        img : x.USER_IMG,
        dt: x.USER_DT,
      }
    })
=======

    // 예시입니다!
    const user = {
      id: 'hyerim',
      name: '혜림',
      img: '/img/user.png',
      dt: '2016-11-27',
      following: [
        {
          name: 'sangbaek'
        }
      ],
      follower: [
        {
          name: 'sangbaek'
        },
        {
          name: 'jonghoon'
        }
      ],
      waves: [
        {
          id: 5,
          dj: 'hyerim',
          name: 'yo',
          desc: 'check it out',
          img: '/img/logo.png',
          view: 123,
          dt: '2016-11-27',
        },
        {
          id: 6,
          dj: 'hyerim',
          name: 'this',
          desc: 'is a pen',
          img: '/img/logo.png',
          view: 123,
          dt: '2016-11-27',
        }
      ]
    }
>>>>>>> refs/remotes/origin/master
    res.json( user )
  })
})


module.exports = router
