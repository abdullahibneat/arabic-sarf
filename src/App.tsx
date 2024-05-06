import {
  AudioPlayerContext,
  AudioPlayerContextType,
} from './contexts/AudioPlayerContext'
import { ModalContext, ModalProps } from './contexts/ModalContext'
import { useCallback, useState } from 'preact/hooks'

import AudioPlayer from './components/AudioPlayer'
import IconButton from './components/IconButton'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Text from './components/Text'

const App = () => {
  const [modal, setModal] = useState<ModalProps | null>(null)
  const [audioPlayer, setAudioPlayer] = useState<AudioPlayerContextType>({
    play: async () => {},
    pause: () => null,
    close: () => null,
    setSrc: async () => {},
  })

  const closeModal = useCallback(() => setModal(null), [])

  return (
    <ModalContext.Provider value={{ open: setModal, close: closeModal }}>
      <AudioPlayerContext.Provider value={audioPlayer}>
        <div class="screen-wrapper">
          <main>
            <div class="screen-content">
              <Outlet />
            </div>

            <AudioPlayer setAudioPlayer={setAudioPlayer} />
          </main>

          <Sidebar />
        </div>

        <div class="global-modal-overlay" onClick={closeModal}>
          {modal && (
            <div
              class="global-modal"
              style={{
                width: modal.width,
                maxWidth: modal.maxWidth,
                height: modal.height,
                maxHeight: modal.maxHeight,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div class="global-modal-header">
                <Text style={{ flex: 1 }} type="bold">
                  {modal.title}
                </Text>
                <div class="global-modal-header-close">
                  <IconButton size="micro" name="close" onClick={closeModal} />
                </div>
              </div>
              <div class="global-modal-content">{modal.children}</div>
            </div>
          )}
        </div>
      </AudioPlayerContext.Provider>
    </ModalContext.Provider>
  )
}

export default App
