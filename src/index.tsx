import {
  AudioPlayerContext,
  AudioPlayerContextType,
} from './contexts/AudioPlayerContext'
import { LocationProvider, Route, Router } from 'preact-iso'
import { ModalContext, ModalProps } from './contexts/ModalContext'
import { useCallback, useEffect, useState } from 'preact/hooks'

import AudioPlayer from './components/AudioPlayer'
import IconButton from './components/IconButton'
import NotFound from './pages/_404'
import OverviewScreen from './pages/OverviewScreen'
import Sidebar from './components/Sidebar'
import TasreefScreen from './pages/TasreefScreen'
import Text from './components/Text'
import { render } from 'preact'
import useAppState from './hooks/useAppState'

const App = () => {
  const appState = useAppState()

  const [modal, setModal] = useState<ModalProps | null>(null)

  useEffect(() => {
    const root = document.documentElement
    root.style.fontSize = `${appState.fontSize}px`
  }, [appState.fontSize])

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(':root')
    if (root) {
      root.style.setProperty('--arabic-font', appState.arabicFont)
    }
  }, [appState.arabicFont])

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
        <LocationProvider>
          <div class="screen-wrapper">
            <main>
              <div class="screen-content">
                <Router>
                  <Route path="/" component={OverviewScreen} />
                  <Route path="/:type" component={OverviewScreen} />
                  <Route
                    path="/:type/:form/:chapter?"
                    component={TasreefScreen}
                  />
                  <Route default component={NotFound} />
                </Router>
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
        </LocationProvider>
      </AudioPlayerContext.Provider>
    </ModalContext.Provider>
  )
}

render(<App />, document.getElementById('app')!)
