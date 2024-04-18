const LOCAL_STORAGE_KEY = 'state'

export type AppStateType = {
  tasreefGroupMode: 'list' | 'by-person' | 'by-gender'
  playbackSpeed: number
  playbackLoop: boolean
  settings: {
    hiddenVerbTypes: string[]
    mujarradChapterHeadings: 'arabic' | 'english' // [ن، ض، ف] / [1a, 1b, 1c]
    mazeedFihiChapterHeadings: 'english' | 'roman' // [2, 3, 4] / [II, III, IV]
    showRootLettersEditor: boolean
    showSarfSagheer: boolean
    showNasb: boolean
    showJazm: boolean
    showAmr: boolean
    showMajhool: boolean
  }
}

export type SetItemListener = (state: AppStateType) => void

const defaultState: AppStateType = {
  tasreefGroupMode: 'list',
  playbackSpeed: 1,
  playbackLoop: false,
  settings: {
    hiddenVerbTypes: [],
    mujarradChapterHeadings: 'arabic',
    mazeedFihiChapterHeadings: 'roman',
    showRootLettersEditor: true,
    showSarfSagheer: true,
    showNasb: true,
    showJazm: true,
    showAmr: true,
    showMajhool: true,
  },
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

      this.applyValidValues(JSON.parse(stateString), this.state)
    } catch (_) {
      // ignore errors
    }
  }

  private saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state))
  }

  private applyValidValues = (from: Object, to: Object) => {
    for (const key of Object.keys(to)) {
      if (to[key] === undefined) continue

      if (Array.isArray(to[key])) {
        if (!Array.isArray(from[key])) continue
        from[key] = to[key]
      } else {
        if (typeof from[key] === 'object') {
          if (typeof to[key] === 'object') {
            this.applyValidValues(to[key], from[key])
          }
        } else {
          from[key] = to[key]
        }
      }
    }
  }
}

export default new State()
