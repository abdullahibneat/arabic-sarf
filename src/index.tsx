import { LocationProvider, Route, Router } from 'preact-iso'

import HomeScreen from './pages/HomeScreen'
import NotFound from './pages/_404'
import TasreefScreen from './pages/TasreefScreen'
import { render } from 'preact'

const App = () => {
  return (
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
  )
}

render(<App />, document.getElementById('app')!)
