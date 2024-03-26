import './styles/App.scss'

import { LocationProvider, Route, Router } from 'preact-iso'

import Home from './pages/Home'
import NotFound from './pages/_404'
import Sidebar from './components/Sidebar'
import { render } from 'preact'

const App = () => {
  return (
    <LocationProvider>
      <div class="app-container">
        <main>
          <Router>
            <Route path="/" component={Home} />
            <Route default component={NotFound} />
          </Router>
        </main>

        <Sidebar />
      </div>
    </LocationProvider>
  )
}

render(<App />, document.getElementById('app')!)
