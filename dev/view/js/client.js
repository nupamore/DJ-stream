
const socketClient = ( waveName ) => {
var socket = io.connect('http://localhost:65007');
    // 서버에 접속할 때, 사용자명을 확인한다.
    socket.on('connect', function() {
        // 서버에 있는 adduser 함수를 호출하며, 하나의 파라미터(prompt의 반환 값)를 전달한다
        socket.emit('adduser', app.me.name );
    });
}
