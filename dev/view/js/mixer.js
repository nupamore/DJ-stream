const drawMixer = () => {
  let diskLx
  let diskLy
  let diskRx
  let diskRy

  const speedL = 0.05
  const speedR = 0.02
  let ringL
  let ringR

  let imgL
  const imgLPath= './img/user.png'
  let imgR
  const imgRPath= './img/user2.png'

  let speedVol
  let volL
  let volR
  let mixX
  let mixY

  let leftLevel
  let rightLevel
  let mixLevel

  let leftDisk
  let rightDisk
  let playL
  let playR

  function setup() {
    frameRate( 30 )
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
    //볼륨속도초기화
    speedVol = PI/144
    //볼륨스위치 각도 초기화
    volL = height*0.38
    volR = height*0.38
    //mix스위치 위치변수 초기화
    mixX = width*0.5
    mixY = height*0.85

    //리턴되는 level값들 초기화
    leftLevel = 1
    rightLevel = 1
    mixLevel = 0

    playL = 'none'
    playR = 'none'
    leftDisk = 'none'
    rightDisk = 'none'
  }

  function draw() {
    if( window.playList ){
      playList.execute( frameCount )
    }

    noStroke()
    rectMode( CENTER )

    //draw table
    fill( 50 )
    rect( width/2, height/2, width, height )

    //디스크판
    drawDisk( diskLx, diskLy, imgL, 'left' )
    drawDisk( diskRx, diskRy, imgR, 'right' )
    //console.log(playL)



    //왼쪽동그라미
    fill( 150 )
    ellipse( width*0.43, height*0.22, height*0.15, height*0.15 )
    fill( 250 )
    ellipse( width*0.43, height*0.22, height*0.13, height*0.13 )

    /*
    if( mixer.getDJ() && mouseIsPressed && (dist(width*0.43, height*0.13, mouseX, mouseY) < width*0.075)){
      let deltaY = pmouseY - mouseY
      if( mouseX > width*0.43 ){
        deltaY = -deltaY
      }
      let delta = ( (abs(mouseX-pmouseX) >= abs(mouseY-pmouseY) ) ? mouseX-pmouseX : deltaY )
      if( delta > 0 ){
        volL += speedVol
      }
      else if ( delta < 0 ){
        volL -= speedVol
      }
      volL = constrain( volL, PI-PI/9, PI+PI/3 )
      //leftLevel = degrees(volL) - 160
      client.setLeft( volL, frameCount )
    }
    */
    push()
    translate( width*0.43, height*0.22 )
  //  rotate( leftLevel%2*PI )
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
    /*
    if( mixer.getDJ() && mouseIsPressed && (dist(width*0.57, height*0.22, mouseX, mouseY) < width*0.075)){
      let deltaY = pmouseY - mouseY
      if( mouseX > width*0.57 ){
        deltaY = -deltaY
      }
      let delta = ( (abs(mouseX-pmouseX) >= abs(mouseY-pmouseY) ) ? mouseX-pmouseX : deltaY )
      if( delta > 0 ){
        volR += speedVol
      }
      else if ( delta < 0 ){
        volR -= speedVol
      }
      volR = constrain( volR, PI-PI/9, PI+PI/3 )
      //rightLevel = degrees(volR) - 160
      client.setRight( volR, frameCount )
    }
    */
    push()
    translate( width*0.57, height*0.22 )
    stroke( 50 )
    strokeWeight( 5 )
    line( height*0.04, 0, height*0.15, 0 )
    noStroke()
    pop()


    //왼쪽 이퀄라이저
    fill( 150 )
    rect( width*0.43, height*0.53, width*0.042, height*0.35 )
    fill( 0 )
    rect( width*0.43, height*0.53, width*0.035, height*0.33 )
    rectMode( CORNERS )
    fill( 255, 131, 47 )
    rect( width*0.4125, height*0.695, width*0.4475, volL)
    rectMode( CENTER )
    fill( 250 )
    rect( width*0.43, height*0.68-leftLevel*(height/3.3), width*0.035, height*0.03 )
    const CL = (mouseX>width*0.4)&&(mouseX<width*0.46)&&(mouseY>height*0.35)&&(mouseY<height*0.71)
      if( mixer.getDJ() && mouseIsPressed && CL ){
        volL += mouseY-pmouseY
        volL = constrain( volL, height*0.38, height*0.68 )
        client.setLeft( (height*0.68-volL)/height*3.3, frameCount )
        //sound.L.volume = leftLevel
      }
    if( window.sound ){
      sound.L.volume = leftLevel
    }

    //오른쪽 이퀄라이저
    fill( 150 )
    rect( width*0.57, height*0.53, width*0.042, height*0.35 )
    fill( 0 )
    rect( width*0.57, height*0.53, width*0.035, height*0.33 )
    rectMode( CORNERS )
    fill( 255, 131, 47 )
    rect( width*0.5525, height*0.695, width*0.5875, volR)
    rectMode( CENTER )
    fill( 250 )
    rect( width*0.57, height*0.68-rightLevel*(height/3.3), width*0.035, height*0.03 )

    const CR = (mouseX>width*0.54)&&(mouseX<width*0.6)&&(mouseY>height*0.35)&&(mouseY<height*0.71)
    if( mixer.getDJ() && mouseIsPressed && CR ){
      volR += mouseY-pmouseY
      volR = constrain( volR, height*0.38, height*0.68 )
      client.setRight( (height*0.68-volR)/height*3.3, frameCount )
    }
    if( window.sound ){
      sound.R.volume = rightLevel
    }

    //가운데큰거
    fill( 0 )
    rect( width*0.5, height*0.85, width*0.2, height*0.2 )
    fill( 150 )
    rect( width*0.5, height*0.85, width*0.005, height*0.02 )
    rect( width*0.5, height*0.85, width*0.16, height*0.01)
    //스위치
    fill( 255 )
    rect( mixLevel*(width/14)+width*0.5, mixY, width*0.025, height*0.1 )
    if( mixer.getDJ() && mouseIsPressed && (mouseX > width*0.4) && (mouseX < width*0.6) && (mouseY > height*0.75) && (mouseY < height*0.95)){
      mixX += mouseX-pmouseX
      mixX = constrain( mixX, width*0.43, width*0.57 )
      client.setMix( (mixX-width*0.5)/width*14, frameCount )
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

    const clickedL = mouseIsPressed && dist(diskLx, diskLy, mouseX, mouseY) < height*0.3
    const clickedR = mouseIsPressed && dist(diskRx, diskRy, mouseX, mouseY) < height*0.3
    if( mixer.getDJ() && window.client ){
      if( !clickedL ){
        ringL += speedL
        leftDisk = 'play'
        if( frameCount%10 == 0 ){
          client.setPlayL( leftDisk, frameCount )
        }
        sound.L.play()
      }
      else if ( clickedL ){
        leftDisk = 'pause'
        if( frameCount%10 == 0 ){
          client.setPlayL( leftDisk, frameCount )
        }
        sound.L.pause()
      }

      if( !clickedR ){
        ringR += speedR
        rightDisk = 'play'
        if( frameCount%10 == 0 ){
          client.setPlayR( rightDisk, frameCount )
        }
        sound.R.play()
      }
      else {
        rightDisk = 'pause'
        if( frameCount%10 == 0 ){
          client.setPlayR( rightDisk, frameCount )
        }
        sound.R.pause()
      }
    }

    else{
      switch( playL ){
        case 'play' :
          ringL += speedL
          sound.L.play()
          break
        case 'pause' :
          sound.L.pause()
          break
        default:
      }
      switch ( playR ) {
        case 'play':
          ringR += speedR
          sound.R.play()
          break
        case 'pause' :
          sound.R.pause()
          break
     }
    }
  }

  function preload() {
    imgL = loadImage(imgLPath)
    imgR = loadImage(imgRPath)
  }

  const mixer = {
    getLevels( levels ){
      mixLevel = levels.mix
      leftLevel = levels.left
      sound.L.level = leftLevel
      rightLevel = levels.right
      playL = levels.playL
      playR = levels.playR
    },
    getDJ(){
      return app.wave.dj == app.me.id
    },
  }

  window.mixer = mixer
  window.setup = setup
  window.draw = draw
  window.preload = preload

}
