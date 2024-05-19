import { useLayoutEffect, useState } from 'preact/hooks'

import useAppState from './useAppState'

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const appState = useAppState()

  useLayoutEffect(() => {
    if (appState.theme !== 'system') {
      setTheme(appState.theme)
      return
    }

    const darkModelistener = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? 'dark' : 'light')
    }

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    setTheme(darkModeMediaQuery.matches ? 'dark' : 'light')

    darkModeMediaQuery.addEventListener('change', darkModelistener)

    return () => {
      darkModeMediaQuery.removeEventListener('change', darkModelistener)
    }
  }, [appState.theme])

  return theme
}

export default useTheme
