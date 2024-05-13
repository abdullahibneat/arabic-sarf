import {
  AudioPlayerContext,
  AudioPlayerContextType,
} from './contexts/AudioPlayerContext'
import { ModalContext, ModalProps } from './contexts/ModalContext'
import { useCallback, useMemo, useState } from 'preact/hooks'

import AudioPlayer from './components/AudioPlayer'
import { ChapterStateContext } from './contexts/ChapterStateContext'
import IconButton from './components/IconButton'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TasreefNavigationHeader from './components/TasreefNavigationHeader'
import Text from './components/Text'
import replaceRoots from './helpers/replaceRoots'
import useRouteChapter from './hooks/useRouteChapter'

const App = () => {
  const [modal, setModal] = useState<ModalProps | null>(null)
  const [audioPlayer, setAudioPlayer] = useState<AudioPlayerContextType>({
    play: async () => {},
    pause: () => null,
    close: () => null,
    setSrc: async () => {},
  })
  const [customRootLetters, setCustomRootLetters] = useState<{
    ف?: string
    ع?: string
    ل?: string
  } | null>(null)

  const baseChapter = useRouteChapter()

  const chapter = useMemo(() => {
    if (baseChapter) return replaceRoots(baseChapter, customRootLetters)
    return null
  }, [baseChapter, customRootLetters])

  const closeModal = useCallback(() => setModal(null), [])

  return (
    <ModalContext.Provider value={{ open: setModal, close: closeModal }}>
      <AudioPlayerContext.Provider value={audioPlayer}>
        <ChapterStateContext.Provider
          value={{
            baseChapter,
            chapter,
            customRootLetters,
            setCustomRootLetters,
          }}
        >
          <div class="screen-wrapper">
            <main>
              <div class="screen-content">
                <TasreefNavigationHeader />
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
                    <IconButton
                      size="micro"
                      name="close"
                      onClick={closeModal}
                    />
                  </div>
                </div>
                <div class="global-modal-content">{modal.children}</div>
              </div>
            )}
          </div>
        </ChapterStateContext.Provider>
      </AudioPlayerContext.Provider>
    </ModalContext.Provider>
  )
}

export default App
