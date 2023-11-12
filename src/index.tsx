import { LocationProvider, Route, Router } from 'preact-iso'

import Home from './Pages/Home'
import NotFound from './Pages/404'
import { render } from 'preact'
import SelectChapter from './Pages/SelectChapter'
import Tasreef from './Pages/Tasreef'

const App = () => (
  <LocationProvider>
    <Router>
      <Route path="/:verbType/:verbForm/:verbChapter" component={Tasreef} />
      <Route path="/:verbType/:verbForm" component={Tasreef} />
      <Route path="/:verbType" component={SelectChapter} />
      <Route path="/" component={Home} />
      <Route default component={NotFound} />
    </Router>
  </LocationProvider>
)

render(<App />, document.getElementById('app')!)
