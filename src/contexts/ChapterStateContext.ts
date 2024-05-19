import { EnglishVerb, VerbChapter } from '../../data/types'

import { createContext } from 'preact'

export type ChapterStateContextType = {
  baseChapter: VerbChapter | null
  chapter: VerbChapter | null
  englishVerb: EnglishVerb | null
  rootLetters: { ف: string; ع: string; ل: string }
  persistRootLetters: boolean
  setRootLetters: (
    rootLetters: { ف: string; ع: string; ل: string },
    englishVerb?: EnglishVerb | null,
  ) => void
  togglePersistRootLetters: () => void
}

export const ChapterStateContext = createContext<ChapterStateContextType>({
  baseChapter: null,
  chapter: null,
  englishVerb: null,
  rootLetters: { ف: 'ف', ع: 'ع', ل: 'ل' },
  persistRootLetters: false,
  setRootLetters: () => null,
  togglePersistRootLetters: () => null,
})
