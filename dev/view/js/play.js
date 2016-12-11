
const playWave = ( waveId, eventList ) => {
  const playList = {
    list: {},

    // 믹서 정보 수정
    execute( frame ){
      if( !playList.list[frame] ){
        return false
      }
      else{
        playList.list[frame].forEach( e => {
          const levels = {
            mix : 0,
            left : 0,
            right : 0,
            playL : 'pause',
            playR : 'pause'
          }
          switch( e.type ){
            case 'play':
              switch( e.target ){
                case 'right':
                  levels.playR = 'play'
                  break
                case 'left':
                  levels.playL = 'play'
                  break
              }
              break
            case 'pause':
              switch( e.target ){
                case 'right':
                  levels.playR = 'pause'
                  break
                case 'left':
                  levels.playL = 'pause'
                  break
              }
              break
            case 'level':
              switch( e.target ){
                case 'right':
                  levels.right = e.value
                  break
                case 'left':
                  levels.left = e.value
                  break
              }
              break
            case 'mix':
              levels.mix = e.value
              break
          }

          mixer.getLevels( levels )
        })
      }
    }
  }

  eventList.forEach( e => {
    if( !playList.list[e.frame] ){
      playList.list[e.frame] = []
    }
    playList.list[e.frame].push(e)
  })

  window.playList = playList
}
