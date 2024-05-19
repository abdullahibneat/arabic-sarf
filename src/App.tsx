import {
  AudioPlayerContext,
  AudioPlayerContextType,
} from './contexts/AudioPlayerContext'
import { ModalContext, ModalProps } from './contexts/ModalContext'
import { useCallback, useEffect, useState } from 'preact/hooks'

import AudioPlayer from './components/AudioPlayer'
import { ChapterStateContext } from './contexts/ChapterStateContext'
import { EnglishVerb } from '../data/types'
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
  const [persistRootLetters, setPersistRootLetters] = useState(false)
  const [englishVerb, setEnglishVerb] = useState<EnglishVerb | null>(null)
  const [rootLetters, setRootLetters] = useState<{
    ف: string
    ع: string
    ل: string
  }>({ ف: 'ف', ع: 'ع', ل: 'ل' })

  const chapter = useRouteChapter()

  useEffect(() => {
    if (!chapter) return
    if (persistRootLetters) return
    const { arabic, english } = chapter.root_letters[0]
    setRootLetters(arabic)
    setEnglishVerb(english)
  }, [chapter, persistRootLetters])

  const closeModal = useCallback(() => setModal(null), [])

  const handlesetRootLetters = useCallback(
    (
      rootLetters: { ف: string; ع: string; ل: string },
      englishVerb: EnglishVerb | null = null,
    ) => {
      setRootLetters(rootLetters)
      setEnglishVerb(englishVerb)
    },
    [],
  )

  return (
    <ModalContext.Provider value={{ open: setModal, close: closeModal }}>
      <AudioPlayerContext.Provider value={audioPlayer}>
        <ChapterStateContext.Provider
          value={{
            baseChapter: chapter,
            chapter: chapter ? replaceRoots(chapter, rootLetters) : null,
            englishVerb,
            rootLetters,
            persistRootLetters,
            setRootLetters: handlesetRootLetters,
            togglePersistRootLetters: () =>
              setPersistRootLetters(!persistRootLetters),
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
