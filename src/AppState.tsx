const LOCAL_STORAGE_KEY = 'state'

export type AppStateType = {
  fontSize: number
  arabicFont:
    | 'System'
    | 'Noto Sans Arabic'
    | 'KFGQPC Uthman Taha Naskh'
    | 'KFGQPC Uthmanic Script Hafs'
  playbackSpeed: number
  playbackLoop: boolean
  theme: 'system' | 'light' | 'dark'
  settings: {
    hiddenVerbTypes: string[]
    mujarradChapterHeadings: 'arabic' | 'english' // [ن، ض، ف] / [1a, 1b, 1c]
    mazeedFihiChapterHeadings: 'english' | 'roman' // [2, 3, 4] / [II, III, IV]
    showRootLettersEditor: boolean
    showSarfSagheer: boolean
    showMushtaqq: boolean
    showNasb: boolean
    showJazm: boolean
    showAmr: boolean
    showNasbJazmParticle: boolean
    showMajhool: boolean
    tasreefGroupMode: 'list' | 'by-person' | 'by-gender'
  }
}

export type SetItemListener = (state: AppStateType) => void

const defaultState: AppStateType = {
  fontSize: 16,
  arabicFont: 'Noto Sans Arabic',
  playbackSpeed: 1,
  playbackLoop: false,
  theme: 'system',
  settings: {
    hiddenVerbTypes: [],
    mujarradChapterHeadings: 'arabic',
    mazeedFihiChapterHeadings: 'roman',
    showRootLettersEditor: true,
    showSarfSagheer: true,
    showMushtaqq: true,
    showNasb: true,
    showJazm: true,
    showAmr: true,
    showNasbJazmParticle: true,
    showMajhool: true,
    tasreefGroupMode: 'list',
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
      if (from[key] === undefined) continue

      if (Array.isArray(to[key])) {
        if (!Array.isArray(from[key])) continue
        to[key] = from[key]
      } else {
        if (typeof to[key] === 'object') {
          if (typeof from[key] === 'object') {
            this.applyValidValues(from[key], to[key])
          }
        } else {
          to[key] = from[key]
        }
      }
    }
  }
}

export default new State()
