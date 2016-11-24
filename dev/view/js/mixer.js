const drawMixer = () => {
  let diskLx
  let diskLy
  let diskRx
  let diskRy

  let speedL = 0.1
  let speedR = 0.01
  let ringL
  let ringR

  let imgL
  const imgLPath= './img/user.png'
  let imgR
  const imgRPath= './img/user2.png'

  let mixSlider

  function setup() {
    smooth()
    const canvas = createCanvas( 900, 400 )
    canvas.parent('mixer')

    // 리사이징
    $('#mixer canvas').css({
      width: '100%',
      height: 'auto'
    })

    //디스크 위치 변수 초기화
    diskLx = width*0.2
    diskLy = height*0.5
    diskRx = width*0.8
    diskRy = height*0.5

    ringL = 0
    ringR = 0;
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
    fill( 0 )
    ellipse( width*0.43, height*0.22, height*0.13, height*0.13 )

    //오른쪽동그라미
    fill( 150 )
    ellipse( width*0.57, height*0.22, height*0.15, height*0.15 )
    fill( 0 )
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
/*
    fill( 150 )
    rect( width*0.5, height*0.85, width*0.17, height*0.01)
    fill( 255 )
    rect( width*0.5, height*0.85, width*0.025, height*0.1 )
*/


  }

/**
 * 디스크를 그립니다
 * @param  {[float]} x        [디스크 중심 x위치]
 * @param  {[float]} y        [디스크 중심 y 위치]
 * @param  {[path]} img      [이미지]
 * @param  {[string]} position [오른쪽/왼쪽 구분]
 * @return {[none]}          [리턴 안합니다]
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
        if( !mouseIsPressed ) {
          ringL += speedL
        }
        pop()
      }
      else if( position == 'right' ) {
        push()
        rotate( ringR )
        image( imgR, 0, 0, height*0.3, height*0.3 )
        ellipse( 0, 0, height*0.4, height*0.4 )
        if( !mouseIsPressed ) {
            ringR += speedR
          }
        pop()
      }
      pop()
  }


  function preload() {
    imgL = loadImage(imgLPath)
    imgR = loadImage(imgRPath)
  }


  window.setup = setup
  window.draw = draw
  window.preload = preload
}
