import { useEffect, useState } from 'preact/hooks'
import AppState from '../AppState'

const useAppState = () => {
  const [state, setState] = useState(AppState.get())

  useEffect(() => {
    const listener = AppState.registerSetItemListener((newState) => {
      setState(newState)
    })

    return () => listener.remove()
  }, [])

  return state
}

export default useAppState
