
const socketClient = ( waveName ) => {
var socket = io.connect('http://localhost:65007')
  socket.on( 'connect', () =>  {
    socket.emit('addUser', prompt( '이름을 입력해주세염 ' ) );
  });

  socket.on( 'updateUser', ( userNames ) => {
    $('#users').empty();
    console.log(userNames)
    $.each( userNames, ( key, value ) => {
      $('#users').append(`${ value } <br>`)
    })
  })

  socket.on( 'chat', ( userName, comment ) => {
    $('#chat').append( `<b>${ userName }</b> : ${ comment } <br>` )
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
}
