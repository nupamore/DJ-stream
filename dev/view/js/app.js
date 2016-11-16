
const app = new Vue({
  el: '.mdl-layout',

  data: {
    // UI 문자열
    text: {
      title: 'DJ-stream',
      mypage: '내 정보',
      logout: '로그아웃',
    },

    // 유저정보
    user: {
      name: '어-ㄴ',
      img: '/img/user.png',
    },

    // 팔로잉 목록
    following: [
      {
        name: '최신 작품',
        waves: [
          {
            title: '최신1',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            img: '/img/album_1.jpg',
          },
          {
            title: '최신2',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            img: '/img/album_2.jpg',
          },
          {
            title: '최신3',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            img: '/img/album_3.jpg',
          }
        ]
      },
      {
        name: 'deadmau5',
        waves: [
          {
            title: '데드마우스1',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            img: '/img/deadmau5_1.jpg',
          },
          {
            title: '데드마우스2',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            img: '/img/deadmau5_2.jpg',
          },
          {
            title: '데드마우스3',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            img: '/img/deadmau5_3.jpg',
          }
        ]
      },
      {
        name: 'SKRILLEX',
        waves: [
          {
            title: '스크릴렉스1',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            img: '/img/skrillex_1.png',
          },
          {
            title: '스크릴렉스2',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            img: '/img/skrillex_2.jpg',
          },
          {
            title: '스크릴렉스3',
            desc: 'Aenan convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            img: '/img/skrillex_3.jpg',
          }
        ]
      },
    ]
  }
})
