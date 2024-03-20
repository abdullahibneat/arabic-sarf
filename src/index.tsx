import { LocationProvider, Route, Router } from 'preact-iso'

import NotFound from './Pages/404'
import { render } from 'preact'
import SelectChapter from './Pages/SelectChapter'
import Tasreef from './Pages/Tasreef'

const App = () => (
  <LocationProvider>
    <Router>
      <Route path="/:verbForm/:verbChapter" component={Tasreef} />
      <Route path="/:verbForm" component={Tasreef} />
      <Route path="/" component={SelectChapter} />
      <Route default component={NotFound} />
    </Router>
  </LocationProvider>
)

render(<App />, document.getElementById('app')!)
