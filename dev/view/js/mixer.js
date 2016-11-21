const drawMixer = () => {
  let speedL = 0.1
  let speedR = 0.01
  var ringL
  var ringR

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
    rect( width/2, height/2, width*0.005, height*0.8 )

    //draw visualizer
    fill( 200 )
    rect( width*0.5, height*0.18, width*0.75, height*0.1, 2, 2, 2, 2 )

    //draw disc
    ellipseMode( CENTER )
    fill( 250 )
    ellipse( width*0.35, height*0.5,height*0.37, height*0.37 )
    ellipse( width*0.65, height*0.5,height*0.37, height*0.37 )
    fill( 0 )
    ellipse( width*0.35, height*0.5,height*0.35, height*0.35 )
    ellipse( width*0.65, height*0.5,height*0.35, height*0.35 )

    //빙글빙글
    angelRingL( width*0.35, height*0.5 )
    angelRingR( width*0.65, height*0.5 )

    fill( 255, 20, 20  )
    ellipse( width*0.35, height*0.5,height*0.15, height*0.15 )
    ellipse( width*0.65, height*0.5,height*0.15, height*0.15 )


    //draw controlers
    fill( 80 )
    //speed left
    rect( width*0.17, height*0.48, width*0.075, height*0.41 )
    fill( 255 )
    rect( width*0.17, height*0.48, width*0.008, height*0.3 )
    //speed right
    fill( 80 )
    rect( width*0.83, height*0.48, width*0.075, height*0.41 )
    fill( 255 )
    rect( width*0.83, height*0.48, width*0.008, height*0.3 )


    fill( 250);
    //center bottom
    rect( width*0.5, height*0.8, width*0.15, height*0.07 )

    //left
    rect( width*0.35, height*0.8, width*0.015, height*0.15 )
    rect( width*0.25, height*0.8, width*0.015, height*0.15 )
    rect( width*0.2, height*0.8, width*0.015, height*0.15 )
    rect( width*0.15, height*0.8, width*0.015, height*0.15 )

    //right
    rect( width*0.65, height*0.8, width*0.015, height*0.15 )
    rect( width*0.75, height*0.8, width*0.015, height*0.15 )
    rect( width*0.8, height*0.8, width*0.015, height*0.15 )
    rect( width*0.85, height*0.8, width*0.015, height*0.15 )
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

  window.setup = setup
  window.draw = draw
}
