const LOCAL_STORAGE_KEY = 'state'

export type AppStateType = {
  tasreefGroupMode: 'list' | 'by-person' | 'by-gender'
  playbackSpeed: number
}

export type SetItemListener = (state: AppStateType) => void

const defaultState: AppStateType = {
  tasreefGroupMode: 'list',
  playbackSpeed: 1,
}

class State {
  private state = defaultState
  private setItemListeners: SetItemListener[] = []

  constructor() {
    this.loadFromLocalStorage()
    this.setItemListeners.push(this.saveToLocalStorage)
  }

  get = () => {
    return this.state
  }

  getItem = <T extends keyof AppStateType>(key: T): AppStateType[T] => {
    return this.state[key]
  }

  setItem = <T extends keyof AppStateType>(key: T, value: AppStateType[T]) => {
    this.state[key] = value
    const state = this.state
    setTimeout(() => {
      for (const listener of this.setItemListeners) {
        listener({ ...state })
      }
    }, 0)
  }

  registerSetItemListener = (listener: SetItemListener) => {
    this.setItemListeners.push(listener)

    return {
      remove: () => {
        this.setItemListeners = this.setItemListeners.filter(
          ($listener) => $listener !== listener,
        )
      },
    }
  }

  private loadFromLocalStorage = () => {
    try {
      const stateString = localStorage.getItem(LOCAL_STORAGE_KEY)

      if (!stateString) return

      const localStorageState = JSON.parse(stateString)

      if (
        'tasreefGroupMode' in localStorageState &&
        typeof localStorageState.tasreefGroupMode === 'string'
      ) {
        this.state.tasreefGroupMode = localStorageState.tasreefGroupMode
      }

      if (
        'playbackSpeed' in localStorageState &&
        typeof localStorageState.playbackSpeed === 'number'
      ) {
        this.state.playbackSpeed = localStorageState.playbackSpeed
      }
    } catch (_) {
      // ignore errors
    }
  }

  private saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state))
  }
}

export default new State()
