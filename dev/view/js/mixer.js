const drawMixer = () => {
  let speedL = 0.1
  let speedR = 0.01
  let ringL
  let ringR

  let imgL
  const imgLPath= './img/user2.png'

  let imgR
  const imgRPath= './img/user.png'


  function setup() {
    const canvas = createCanvas( 900, 450 )
    canvas.parent('mixer')

    // 리사이징
    $('#mixer canvas').css({
      width: '100%',
      height: 'auto'
    })

    ringL = 0
    ringR = 0;
  }

  function draw() {
    noStroke()
    rectMode( CENTER )

    //draw table
    fill( 50 )
    rect( width/2, height/2, width, height )
    //가운데 선
    fill( 0 )
    rect( width/2, height/2, width*0.005, height )

    //draw visualizer
    fill( 200 )
    rect( width*0.5, height*0.1, width*0.95, height*0.12, 2, 2, 2, 2 )

    //디스크판
    ellipseMode( CENTER )
    fill( 250 )
    ellipse( width*0.3, height*0.425, height*0.45, height*0.45 )
    ellipse( width*0.7, height*0.425,height*0.45, height*0.45 )

    fill( 0 )
    ellipse( width*0.3, height*0.425,height*0.43, height*0.43 )
    ellipse( width*0.7, height*0.425,height*0.43, height*0.43 )

    imageMode(CENTER)
    push()
    translate( width*0.3, height*0.425 )
    rotate( ringL )
    image( imgL, 0, 0, height*0.2, height*0.2 )
    fill(0, 0, 0, 0)
    stroke(0)
    strokeWeight( height*0.1 )
    ellipse( 0, 0, height*0.3, height*0.3 )
    ringL += speedL
    pop()
    push()
    translate( width*0.7, height*0.425 )
    rotate( ringR )
    image( imgR, 0, 0, height*0.2, height*0.2 )
    fill(0, 0, 0, 0)
    stroke(0)
    strokeWeight( height*0.1 )
    ellipse( 0, 0, height*0.3, height*0.3 )
    ringR += speedR
    pop()

    //컨트롤러
    //왼쪽큰거
    fill( 80 )
    rect( width*0.075, height*0.45, width*0.1, height*0.5 )
    fill( 255 )
    rect( width*0.075, height*0.4, width*0.008, height*0.33 )
    rect( width*0.075, height*0.63, width*0.07, height*0.08 )
    fill( 20, 255, 20 )

    //오른쪽큰거
    fill( 80 )
    rect( width*0.925, height*0.45, width*0.1, height*0.5 )
    fill( 255 )
    rect( width*0.925, height*0.4, width*0.008, height*0.33 )
    rect( width*0.925, height*0.63, width*0.07, height*0.08 )

    //가운데큰거
    fill( 30 )
    rect( width*0.5, height*0.85, width*0.2, height*0.2 )

    //left
    fill( 250 )
    rect( width*0.05, height*0.85, width*0.005, height*0.18 )
    rect( width*0.12, height*0.85, width*0.005, height*0.18 )
    rect( width*0.19, height*0.85, width*0.005, height*0.18 )
    rect( width*0.3, height*0.85, width*0.005, height*0.18 )

    //right
    rect( width*0.95, height*0.85, width*0.005, height*0.18 )
    rect( width*0.88, height*0.85, width*0.005, height*0.18 )
    rect( width*0.81, height*0.85, width*0.005, height*0.18 )
    rect( width*0.7, height*0.85, width*0.005, height*0.18 )

    if( mouseIsPressed ) {
      rect(width/2, height/2, 100, 100)
    }
  }

  /**
   * 오른쪽디스크 빙글빙글
   * @param  {[type]} x [L디스크중심x좌표]
   * @param  {[type]} y [L디스크중심y좌표]
   * @return none
   */
  function angelRingL( x, y ) {
    push()
    translate( x, y )
    stroke( 255 )
    strokeWeight( 3 )
    rotate( ringL )
    line( 0, 0, 0, height * 0.18 )

    ringL += speedL
    pop()
  }

  /**
   * 오른쪽디스크빙글빙글
   * @param  {[type]} x [R디스크중심x좌표]
   * @param  {[type]} y [R디스크중심y좌표]
   */
  function angelRingR( x, y ) {
    push()
    translate( x, y )
    stroke( 255 )
    strokeWeight( 3 )
    rotate( ringR )
    line( 0, 0, 0, height * 0.18 )

    ringR += speedR
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
