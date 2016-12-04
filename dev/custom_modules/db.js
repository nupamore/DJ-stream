
const secret = require('./secret.js')


const fun25Info = {
  host : 'nupa.fun25.co.kr',
  port : 17904,
  user : 'hyerim',
  password : secret.fun25,
  database : 'djstream'
}

const gachonInfo = {
  host : 'localhost',
  port : 3306,
  user : '7team',
  password : secret.gachon,
  database : '7team'
}

// 교수님 보여줄 때는 바꿔치기
exports.connectionInfo = fun25Info
