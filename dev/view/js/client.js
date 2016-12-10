const socketClient = ( waveId ) => {
  
var socket = io.connect('http://localhost:65007')
  socket.on( 'connect', () =>  {
    //socket.emit('addUser', prompt( '이름을 입력해주세염 ' ), waveId );
    socket.emit('addUser', app.me.name, waveId );
  });

  socket.on( 'updateUser', ( userNames ) => {
    $('#users').empty();
    $.each( userNames, ( key, value ) => {
      $('#users').append(`${ value } <br>`)
    })
  })

  socket.on( 'chat', ( userName, comment ) => {
    $('#chat').append( `<b>${ userName }</b> : ${ comment } <br>` )

  })

  socket.on( 'getLevels', ( levels ) => {
    mixer.getLevels( levels )
  })


  $( function() {
    $('#datasend').click( () => {
      const message = $('#data').val()
      $('#data').val('')
      socket.emit( 'sendChat', message )
    })
    $('#data').keypress( ( e ) => {
      if( e.which == 13 ){
        $(this).blur()
        $('#datasend').focus().click()
      }
    })
  })


  const client = {
    setMix( level ){
      socket.emit( 'setLevels', 'mix', level )
    },
    setLeft( level ){
      socket.emit( 'setLevels', 'left', level )
    },
    setRight( level ){
      socket.emit( 'setLevels', 'right', level)
    },
    setPlayL( level ){
      socket.emit( 'setLevels', 'playL', level)
    },
    setPlayR( level ){
      socket.emit( 'setLevels', 'playR', level)
    }
  }

  window.client = client

  window.sound = {
    L : new Audio('/files/Drum.mp3'),
    R : new Audio('/files/Drumless.mp3')
  }
}
