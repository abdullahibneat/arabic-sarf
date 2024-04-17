import { LocationProvider, Route, Router } from 'preact-iso'
import { ModalContext, ModalProps } from './contexts/ModalContext'
import { useCallback, useState } from 'preact/hooks'

import HomeScreen from './pages/HomeScreen'
import IconButton from './components/IconButton'
import NotFound from './pages/_404'
import TasreefScreen from './pages/TasreefScreen'
import Text from './components/Text'
import { render } from 'preact'

const App = () => {
  const [modal, setModal] = useState<ModalProps | null>(null)

  const closeModal = useCallback(() => setModal(null), [])

  return (
    <ModalContext.Provider value={{ open: setModal, close: closeModal }}>
      <LocationProvider>
        <Router>
          <Route path="/" component={HomeScreen} />
          <Route
            path="/:verbType/:verbForm/:verbChapter?"
            component={TasreefScreen}
          />
          <Route default component={NotFound} />
        </Router>
      </LocationProvider>

      <div class="global-modal-overlay" onClick={closeModal}>
        {modal && (
          <div class="global-modal" onClick={(e) => e.stopPropagation()}>
            <div class="global-modal-header">
              <Text style={{ flex: 1 }}>{modal.title}</Text>
              <div class="global-modal-header-close">
                <IconButton size="micro" name="close" onClick={closeModal} />
              </div>
            </div>
            <div>{modal.children}</div>
          </div>
        )}
      </div>
    </ModalContext.Provider>
  )
}

render(<App />, document.getElementById('app')!)
