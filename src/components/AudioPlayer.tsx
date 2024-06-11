import '../styles/AudioPlayer.scss'

import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import AppState from '../AppState'
import { AudioPlayerContextType } from '../contexts/AudioPlayerContext'
import IconButton from './IconButton'
import Text from './Text'
import useAppState from '../hooks/useAppState'

type Props = {
  setAudioPlayer: (audioPlayer: AudioPlayerContextType) => void
}

const AudioPlayer = ({ setAudioPlayer }: Props) => {
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const { playbackSpeed, playbackLoop } = useAppState()

  const audio = useRef(new Audio()).current

  useEffect(() => {
    audio.addEventListener('timeupdate', () =>
      setCurrentTime(audio.currentTime),
    )
    audio.addEventListener('ended', () => {
      if (!audio.loop) {
        setPlaying(false)
      }
    })
  }, [])

  useEffect(() => {
    audio.playbackRate = playbackSpeed
  }, [playbackSpeed])

  useEffect(() => {
    audio.loop = playbackLoop
  }, [playbackLoop])

  useEffect(() => {
    setAudioPlayer({
      play,
      pause,
      close,
      setSrc,
    })
  }, [])

  const play = useCallback(async () => {
    await audio?.play()
    setPlaying(true)
  }, [])

  const pause = useCallback(() => {
    audio?.pause()
    setPlaying(false)
  }, [])

  const close = useCallback(() => {
    audio.src = ''
    setPlaying(false)
    setVisible(false)
  }, [])

  const setSrc = useCallback(async (src: string) => {
    audio.src = src
    audio.playbackRate = AppState.getItem('playbackSpeed')
    try {
      await audio.play()
      setPlaying(true)
      setVisible(true)
    } catch (_) {
      alert(`This audio hasn't been recorded yet`)
    }
  }, [])

  return (
    <div class={`audio-player ${visible ? 'visible' : ''}`}>
      <div class="main-controls">
        {playing && <IconButton name="pause" onClick={pause} />}

        {!playing && <IconButton name="play" onClick={play} />}

        <input
          type="range"
          max={Math.floor(audio.duration)}
          value={currentTime}
          onChange={(e) => {
            if (e.target && 'value' in e.target)
              audio.currentTime = e.target.value as number
          }}
        />

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

        <IconButton
          name="repeat"
          active={playbackLoop}
          onClick={() => AppState.setItem('playbackLoop', !playbackLoop)}
        />
      </div>

      <div class="gap" />

      <IconButton
        size="micro"
        name="close"
        color="text-secondary"
        hoverColor="text"
        onClick={close}
      />
    </div>
  )
}

export default AudioPlayer
