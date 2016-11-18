
const app = new Vue({
  el: '.mdl-layout',

  methods: {
    getUserInfo( name ){
      $.ajax( `/${ name }` )
      .done( data => {
        this.user = data
      })
    },
  },

  data: {
    // UI 문자열
    text: {
      title: 'DJ-stream',
      mypage: '내 정보',
      logout: '로그아웃',
    },

    // 유저정보
    user: {}
  }
})

app.getUserInfo( '어-ㄴ' )
