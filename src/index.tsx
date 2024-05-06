import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App'
import NotFound from './pages/_404'
import OverviewScreen from './pages/OverviewScreen'
import TasreefScreen from './pages/TasreefScreen'
import { render } from 'preact'
import useAppState from './hooks/useAppState'
import { useEffect } from 'preact/hooks'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/:type?',
        element: <OverviewScreen />,
        errorElement: <NotFound />,
      },
      {
        path: '/:type/:form/:chapter?',
        element: <TasreefScreen />,
      },
    ],
  },
])

const Entrypoint = () => {
  const appState = useAppState()

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

  return <RouterProvider router={router} />
}

render(<Entrypoint />, document.getElementById('app')!)
