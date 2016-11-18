
const app = new Vue({
  el: '.mdl-layout',

  data: {
    // UI 문자열
    text: {
      title: 'DJ-stream',
      mypageButton: '내 정보',
      logoutButton: '로그아웃',
    },

    // 화면 정보
    page: '/main',

    // 유저정보
    user: {},

    // 검색키워드
    searchKeyword: '',

    // 검색결과
    searchResult: [],
  },

  methods: {
    // 유저정보 가져오기
    getUserInfo( name ){
      $.ajax( `/${ name }` )
      .done( data => {
        this.user = data
        this.searchResult = data.following[1].waves
      })
    },

    // 검색하기
    search( keyword ){
      this.page = '/search'
    },
  },
})

app.getUserInfo( '어-ㄴ' )
