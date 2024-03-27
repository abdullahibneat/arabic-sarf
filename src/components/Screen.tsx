import '../styles/Screen.scss'

import AudioPlayer from './AudioPlayer'
import { ComponentChildren } from 'preact'
import Sidebar from './Sidebar'

type Props = {
  children: ComponentChildren
}

const Screen = ({ children }: Props) => {
  return (
    <div class="screen-wrapper">
      <main>
        <div class="screen-content">{children}</div>
        <AudioPlayer />
      </main>

      <Sidebar />
    </div>
  )
}

export default Screen
