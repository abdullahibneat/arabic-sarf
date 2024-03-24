import { render } from 'preact'
import { LocationProvider, Router, Route } from 'preact-iso'
import Home from './pages/Home'
import NotFound from './pages/_404'

const App = () => {
  return (
    <LocationProvider>
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  )
}

render(<App />, document.getElementById('app')!)
