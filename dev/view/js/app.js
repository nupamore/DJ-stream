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

    // 내 정보
    me: {
      name: 'guest'
    },

    // 유저정보
    user: {},

    // 작품정보들
    waves: [],

    // 작품정보
    wave: {
      id: '',
      name: '',
      desc: '',
    },

    // 검색키워드
    searchKeyword: '',

    // 모달
    dialog: '',

    // 에러여부
    error: false,
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

      if( !replace ){
        history.pushState( page, '', path )
      }
      else{
        history.replaceState( page, '', path )
      }

      // 햄버거메뉴 숨기기
      $( '.mdl-layout__drawer' ).removeClass( 'is-visible' );
      $( '.mdl-layout__obfuscator' ).removeClass( 'is-visible' );

      // 라우터
      switch( page ){
        case '/intro':
          $( '.slide' ).hide()
          $( '#intro' ).show()
          this.page = page
        break;

        case '/':
          $( '.slide' ).slideUp()

          this.getMyInfo( data => {
            this.me = data

            this.me.following.forEach( (dj, index) => {
              this.getUserInfo( dj.name, data => {
                this.$set( this.me.following[index], data )
                this.me.following[index] = data
              })
            })
          })
          this.searchKeyword = ''
          this.page = page
        break;

        case '/join':
          $( '#join' ).slideDown()

          this.page = page
        break;

        case '/search':
          this.search( path.split('k=')[1] )
        break;

        default:
          const params = path.split('/')

          // 유저
          if( !params[2] ){
            this.getUserInfo( params[1], data => {
              this.user = data
              this.page = '/:user'
            })
          }
          // 작품
          else{
            this.page = '/:user/:wave'
            $.ajax( document.location.pathname )
            .done( data => {
              this.wave = data

              console.log( $('#mixer') )
              drawMixer()
              socketClient( this.wave.dj, this.wave.id )
            })
          }
        break;
      }

      setTimeout( () => componentHandler.upgradeDom(), 100 )
    },


    /**
     * 작품들을 검색한다.
     * @param {String}  keyword 키워드
     * @return {SideEffect}
     */
    search( keyword ){
      const path = `/search?k=${ keyword }`
      const replace = this.page == '/search'

      $.ajax({
        url : '/search',
        data : {
          k : keyword
        }
      })
      .done( data => {
        this.waves = data
        this.page = '/search'

        if( !replace ){
          history.pushState( this.page, '', path )
        }
        else{
          history.replaceState( this.page, '', path )
        }
      })
    },


    /**
     * 유저 정보를 요청한다.
     * @param {String}  id  아이디
     * @return {SideEffect}
     */
    getUserInfo( id, callback ){
      $.ajax( `/${ id }` )
      .done( data => {
        callback( data )
      })
    },


    /**
     * 내 정보를 요청한다.
     * @param {String}  id  아이디
     * @return {SideEffect}
     */
    getMyInfo( callback ){
      $.ajax( `/me` )
      .done( data => {
        callback( data )
      })
    },


    /**
     * 내 정보를 수정한다.
     * @param {String}  id  아이디
     * @return {SideEffect}
     */
    changeMyInfo(){
      $.ajax({
        url: `/${ this.me.id }`,
        method: 'PUT',
        data: {
          name: this.me.name
        }
      })
      .done( data => this.go('/') )
    },


    /**
     * 다이얼로그를 띄운다.
     * @param {String}  type  종류
     * @return {SideEffect}
     */
    showDialog( type ){
      this.dialog = type
      $('dialog')[0].showModal();
      setTimeout( () => componentHandler.upgradeDom(), 100 )
    },


    /**
     * 새 작품을 시작한다.
     * @return {SideEffect}
     */
    createWave(){
      $.ajax({
        url: `/${ this.me.id }/${ this.wave.name }`,
        method: 'POST',
        data: {
          desc: this.wave.desc
        }
      })
      .done( data => {
        location.href = `/${ this.me.id }/${ this.wave.name }`
      })
    },
  },

})

// 히스토리 감시
window.onpopstate = ( event ) => {
  const page = document.location.pathname
  app.go( page, true )
}

// main
app.go( document.location.href.split( document.location.host )[1] , true )
app.getMyInfo( data => {
  app.me = data
})
