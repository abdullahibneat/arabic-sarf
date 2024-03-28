import '../styles/Screen.scss'

import {
  AudioPlayerContext,
  AudioPlayerContextType,
} from '../contexts/AudioPlayerContext'

import AudioPlayer from './AudioPlayer'
import { ComponentChildren } from 'preact'
import Sidebar from './Sidebar'
import { useState } from 'preact/hooks'

type Props = {
  children: ComponentChildren
}

const Screen = ({ children }: Props) => {
  const [audioPlayer, setAudioPlayer] = useState<AudioPlayerContextType>({
    play: async () => {},
    pause: () => null,
    close: () => null,
    setSrc: async () => {},
  })

  return (
    <AudioPlayerContext.Provider value={audioPlayer}>
      <div class="screen-wrapper">
        <main>
          <div class="screen-content">{children}</div>
          <AudioPlayer setAudioPlayer={setAudioPlayer} />
        </main>

        <Sidebar />
      </div>
    </AudioPlayerContext.Provider>
  )
}

export default Screen
