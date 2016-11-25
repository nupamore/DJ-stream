const drawMixer = () => {
  let diskLx
  let diskLy
  let diskRx
  let diskRy

  let speedL = 0.05
  let speedR = 0.02
  let ringL
  let ringR

  let imgL
  const imgLPath= './img/user.png'
  let imgR
  const imgRPath= './img/user2.png'

  let volLX
  let volLY
  let volRX
  let volRY
  let volL
  let volR
  let mixX
  let mixY

  function setup() {
    noCursor()
    const canvas = createCanvas( 900, 400 )
    canvas.parent('mixer')

    // 리사이징
    $('#wave canvas').css({
      width: '100%',
      height: 'auto'
    })

    //디스크 위치 변수 초기화
    diskLx = width*0.2
    diskLy = height*0.5
    diskRx = width*0.8
    diskRy = height*0.5
    //디스크 회전 관련 변수 초기화
    ringL = 0
    ringR = 0;
    //볼륨스위치 각도 초기화
    volL = -PI-PI/6
    volR = -PI-PI/6
    volRY = height*0.22
    //mix스위치 위치변수 초기화
    mixX = width*0.5
    mixY = height*0.85
  }

  function draw() {
    noStroke()
    rectMode( CENTER )

    //draw table
    fill( 50 )
    rect( width/2, height/2, width, height )

    //디스크판
    drawDisk( diskLx, diskLy, imgL, 'left' )
    drawDisk( diskRx, diskRy, imgR, 'right' )

    //왼쪽동그라미
    fill( 150 )
    ellipse( width*0.43, height*0.22, height*0.15, height*0.15 )
    fill( 250 )
    ellipse( width*0.43, height*0.22, height*0.13, height*0.13 )
    let delta
    if( mouseIsPressed && (dist(width*0.43, height*0.13, mouseX, mouseY) < height*0.2)){
      console.log(volL)
      delta = ( (mouseX >= mouseY) ? mouseX : mouseY )
      volL += delta
      volL = constrain( volL, -PI-PI/6, PI+PI/6)
    }
    push()
    translate( volLX, volLY )
    rotate( volL )
    stroke( 50 )
    strokeWeight( 5 )
    line( height*0.04, 0, height*0.15, 0 )
    noStroke()
    pop()

    //오른쪽동그라미
    fill( 150 )
    ellipse( width*0.57, height*0.22, height*0.15, height*0.15 )
    fill( 250 )
    ellipse( width*0.57, height*0.22, height*0.13, height*0.13 )

    //왼쪽 이퀄라이저
    fill( 150 )
    rect( width*0.43, height*0.53, width*0.042, height*0.35 )
    fill( 0 )
    rect( width*0.43, height*0.53, width*0.035, height*0.33 )
    //오른쪽 이퀄라이저
    fill( 150 )
    rect( width*0.57, height*0.53, width*0.042, height*0.35 )
    fill( 0 )
    rect( width*0.57, height*0.53, width*0.035, height*0.33 )

    //가운데큰거
    fill( 0 )
    rect( width*0.5, height*0.85, width*0.2, height*0.2 )
    fill( 150 )
    rect( width*0.5, height*0.85, width*0.005, height*0.02 )
    rect( width*0.5, height*0.85, width*0.16, height*0.01)
    //스위치
    fill( 255 )
    rect( mixX, mixY, width*0.025, height*0.1 )
    if( mouseIsPressed && (mouseX > width*0.4) && (mouseX < width*0.6) && (mouseY > height*0.75) && (mouseY < height*0.95)){
      mixX += mouseX-pmouseX
      mixX = constrain( mixX, width*0.43, width*0.57 )
    }


    // 커서위치
    fill(255)
    stroke( 0 )
    rect(mouseX, mouseY, 10, 10)
  }

/**
 * 디스크를 그립니다
 * @param  {Number} x        [디스크 중심 x위치]
 * @param  {Number} y        [디스크 중심 y 위치]
 * @param  {String} img      [이미지]
 * @param  {String} position [오른쪽/왼쪽 구분]
 * @return {none}            [리턴 안합니다]
 */
  function drawDisk( x, y, img, position ) {
    ellipseMode( CENTER )
    imageMode(CENTER)
    noStroke()
      push()
      translate( x, y )
      fill( 250 )
      ellipse( 0, 0, height*0.62, height*0.62 )
      fill( 0 )
      ellipse( 0, 0, height*0.6, height*0.6 )
      fill(0, 0, 0, 0)
      stroke(0)
      strokeWeight( height*0.1 )
      if( position == 'left') {
        push()
        rotate( ringL )
        image( imgL, 0, 0, height*0.3, height*0.3 )
        ellipse( 0, 0, height*0.4, height*0.4 )

        pop()
      }
      else if( position == 'right' ) {
        push()
        rotate( ringR )
        image( imgR, 0, 0, height*0.3, height*0.3 )
        ellipse( 0, 0, height*0.4, height*0.4 )
        pop()
      }
      pop()

      if(!( mouseIsPressed && dist(diskLx, diskLy, mouseX, mouseY) < height*0.3) ) {
        ringL += speedL
      }
      if(!( mouseIsPressed && dist(diskRx, diskRy, mouseX, mouseY) < height*0.3) ) {
        ringR += speedR
      }
  }


  function preload() {
    imgL = loadImage(imgLPath)
    imgR = loadImage(imgRPath)
  }


  window.setup = setup
  window.draw = draw
  window.preload = preload
}
