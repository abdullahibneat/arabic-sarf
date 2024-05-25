import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App'
import FlashcardsScreen from './pages/FlashcardsScreen'
import NotFound from './pages/_404'
import OverviewScreen from './pages/OverviewScreen'
import TasreefScreen from './pages/TasreefScreen'
import { render } from 'preact'
import useAppState from './hooks/useAppState'
import { useLayoutEffect } from 'preact/hooks'
import useTheme from './hooks/useTheme'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/flashcards',
        element: <FlashcardsScreen />,
      },
      {
        path: '/:type?',
        element: <OverviewScreen />,
      },
      {
        path: '/:type/flashcards',
        element: <FlashcardsScreen />,
      },
      {
        path: '/:type/:form',
        element: <TasreefScreen />,
      },
      {
        path: '/:type/:form/flashcards',
        element: <FlashcardsScreen />,
      },
      {
        path: '/:type/:form/:chapter',
        element: <TasreefScreen />,
      },
      {
        path: '/:type/:form/:chapter/flashcards',
        element: <FlashcardsScreen />,
      },
    ],
  },
])

const Entrypoint = () => {
  const appState = useAppState()

  const theme = useTheme()

  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(':root')
    if (root) {
      if (theme === 'dark') {
        root.classList.remove('light')
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
        root.classList.add('light')
      }
    }
  }, [theme])

  useLayoutEffect(() => {
    const root = document.documentElement
    root.style.fontSize = `${appState.fontSize}px`
  }, [appState.fontSize])

  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(':root')
    if (root) {
      root.style.setProperty('--arabic-font', appState.arabicFont)
    }
  }, [appState.arabicFont])

  return <RouterProvider router={router} />
}

render(<Entrypoint />, document.getElementById('app')!)
