
const app = new Vue({
  el: '.mdl-layout',

  data: {
    // UI 문자열
    text: {
      title: 'DJ-stream',
      introMessage: '환영합니다!',
      loginButton: '페이스북 계정으로 로그인',
      guestButton: '다음에 할게요',

      logoutButton: '로그아웃',
      mypageButton: '내 정보',
    },

    // 화면정보
    page: '/',

    // 유저정보
    user: {},

    // 검색키워드
    searchKeyword: '',

    // 검색결과
    searchResult: [],
  },

  methods: {
    // 인트로 숨기기
    closeIntro(){
      $('#intro').slideUp()
    },

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
      const path = `/search?k=${ keyword }`

      if( !/search/.test(history.state) ){
        this.page = '/search'
        history.pushState( this.page, '검색창', path )
      }
      else if( this.page = '/search' ){
        history.replaceState( this.page, '검색창', path )
      }
    },
  },

})

// 히스토리 감시
window.onpopstate = ( event ) => {
  app.page = document.location.pathname

  switch( app.page ){
    case '/':
      app.searchKeyword = ''
    break;
  }
}

history.state = document.location.pathname
app.getUserInfo( '어-ㄴ' )
