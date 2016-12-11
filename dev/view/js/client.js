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
    setMix( level, frame ){
      socket.emit( 'setLevels', 'mix', level, frame )
    },
    setLeft( level, frame ){
      socket.emit( 'setLevels', 'left', level, frame )
    },
    setRight( level, frame ){
      socket.emit( 'setLevels', 'right', level, frame )
    },
    setPlayL( level, frame ){
      socket.emit( 'setLevels', 'playL', level, frame )
    },
    setPlayR( level, frame ){
      socket.emit( 'setLevels', 'playR', level, frame )
    },
    close(){
      socket.disconnect()
    },
  }

  window.client = client

  window.sound = {
    L : new Audio('/files/Drum.mp3'),
    R : new Audio('/files/Drumless.mp3')
  }
}
