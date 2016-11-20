
// modules
const express = require('express')


const router = express.Router()

router.get( '/:userId', (req, res) => {

  const sample = {
    name: 'DJ토끼',
    img: '/img/user.png',
    dt: '2016-11-20',
    follower: [
      {
        name: '거북이'
      },
      {
        name: '사자'
      },
      {
        name: '호랑이'
      },
    ],
    following: [
      {
        name: '최신 작품',
        waves: [
          {
            title: '최신1',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet.',
            img: '/img/album_1.jpg',
            dt: '1시간전',
          },
          {
            title: '최신2',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet.',
            img: '/img/album_2.jpg',
            dt: '2시간전',
          },
          {
            title: '최신3',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet.',
            img: '/img/album_3.jpg',
            dt: '3시간전',
          }
        ]
      },
      {
        name: 'deadmau5',
        waves: [
          {
            title: '데드마우스1',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet.',
            img: '/img/deadmau5_1.jpg',
            dt: '1시간전',
          },
          {
            title: '데드마우스2',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet.',
            img: '/img/deadmau5_2.jpg',
            dt: '2시간전',
          },
          {
            title: '데드마우스3',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet.',
            img: '/img/deadmau5_3.jpg',
            dt: '3시간전',
          }
        ]
      },
      {
        name: 'SKRILLEX',
        waves: [
          {
            title: '스크릴렉스1',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet.',
            img: '/img/skrillex_1.png',
            dt: '1시간전',
          },
          {
            title: '스크릴렉스2',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet.',
            img: '/img/skrillex_2.jpg',
            dt: '2시간전',
          },
          {
            title: '스크릴렉스3',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet.',
            img: '/img/skrillex_3.jpg',
            dt: '3시간전',
          }
        ]
      }
    ]
  }

  res.send( sample )
})

module.exports = router
