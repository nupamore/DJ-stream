
const app = new Vue({
  el: '.mdl-layout',

  data: {
    // UI 문자열
    text: {
      title: 'DJ-stream',
      intro: '환영합니다!',
      loginButton: '페이스북 계정으로 로그인',
      guestButton: '다음에 할게요',

      logoutButton: '로그아웃',
      mypageButton: '내 정보',

      nickname: '닉네임',
      regexError: '잘못된 형식입니다',
      confirmButton: '적용',
    },

    // 화면정보
    page: '/intro',

    // 유저정보
    user: {},

    // 검색키워드
    searchKeyword: '',

    // 검색결과
    searchResult: [],
  },

  methods: {
    // 페이지 이동
    go( path, replace ){
      const page = path.replace( /\?.*/, '' )
      this.page = page

      if( !replace ){
        history.pushState( page, '검색창', path )
      }
      else{
        history.replaceState( page, '검색창', path )
      }

      // router
      switch( page ){
        case '/intro':
          $( '.slide' ).hide()
          $( '#intro' ).show()
        break;

        case '/':
          $( '.slide' ).slideUp()
          app.getUserInfo( '어-ㄴ' )
          this.searchKeyword = ''
        break;

        case '/join':
          $( '#join' ).slideDown()
        break;
      }

      setTimeout( () => componentHandler.upgradeDom(), 100 )
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
      const replace = this.page == '/search'
      this.go( path, replace )
    },
  },

})

// 히스토리 감시
window.onpopstate = ( event ) => {
  const page = document.location.pathname
  app.go( page, true )
}

// main
app.go( document.location.pathname, true )
app.getUserInfo( 'me' )
