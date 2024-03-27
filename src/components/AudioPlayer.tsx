import '../styles/AudioPlayer.scss'

import AppState from '../AppState'
import IconButton from './IconButton'
import Text from './Text'
import useAppState from '../hooks/useAppState'

const AudioPlayer = () => {
  const { playbackSpeed } = useAppState()

  return (
    <div class="audio-player">
      <IconButton name="play" />
      <input type="range" />
      <div class="playback-speed">
        {[1, 1.5, 2].map((speed) => (
          <div
            key={String(speed)}
            class={playbackSpeed === speed ? 'active' : ''}
            onClick={() => AppState.setItem('playbackSpeed', speed)}
          >
            <Text type="small-bold" color="text-secondary">
              {`${speed}x`}
            </Text>
          </div>
        ))}
      </div>
      <IconButton name="repeat" />
    </div>
  )
}

export default AudioPlayer
