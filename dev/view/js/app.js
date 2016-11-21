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
    /**
     * 클라이언트측에서 url을 바꿀 때 이 함수를 사용한다.
     * 두번째 파라미터를 따라 history에 push하거나 replace한다.
     * @param {String} path 주소
     * @param {Boolean} replace push or replace
     * @return {SideEffect}
     */
    go( path, replace ){
      const page = path.replace( /\?.*/, '' )
      this.page = page

      if( !replace ){
        history.pushState( page, '검색창', path )
      }
      else{
        history.replaceState( page, '검색창', path )
      }

      // 햄버거메뉴 숨기기
      $( '.mdl-layout__drawer' ).removeClass( 'is-visible' );
      $( '.mdl-layout__obfuscator' ).removeClass( 'is-visible' );

      // 라우터
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

    /**
     * 유저 정보를 요청한다.
     * @param {String}  id  아이디
     * @return {SideEffect}
     */
    getUserInfo( id ){
      $.ajax( `/${ id }` )
      .done( data => {
        this.user = data
        this.searchResult = data.following[1].waves
      })
    },

    /**
     * 작품들을 검색한다.
     * @param {String}  keyword 키워드
     * @return {SideEffect}
     */
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
