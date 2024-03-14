const LOCAL_STORAGE_KEY = 'state'

export type StateType = {
  groupTasreefs: boolean
}

export type SetItemListener = (state: StateType) => void

const defaultState: StateType = {
  groupTasreefs: true,
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

  getItem = <T extends keyof StateType>(key: T): StateType[T] => {
    return this.state[key]
  }

  setItem = <T extends keyof StateType>(key: T, value: StateType[T]) => {
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

      const state = JSON.parse(stateString)

      if (
        'groupTasreefs' in state &&
        typeof state.groupTasreefs === 'boolean'
      ) {
        this.state.groupTasreefs = state.groupTasreefs
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
