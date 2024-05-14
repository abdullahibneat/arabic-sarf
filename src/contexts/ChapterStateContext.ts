import { EnglishVerb, VerbChapter } from '../../data/types'

import { createContext } from 'preact'

export type ChapterStateContextType = {
  baseChapter: VerbChapter | null
  chapter: VerbChapter | null
  englishVerb: EnglishVerb | null
  customRootLetters?: { ف?: string; ع?: string; ل?: string } | null
  persistRootLetters: boolean
  setCustomRootLetters: (
    rootLetters: { ف?: string; ع?: string; ل?: string } | null,
    englishVerb?: EnglishVerb | null,
  ) => void
  togglePersistRootLetters: () => void
}

export const ChapterStateContext = createContext<ChapterStateContextType>({
  baseChapter: null,
  chapter: null,
  englishVerb: null,
  persistRootLetters: false,
  setCustomRootLetters: () => null,
  togglePersistRootLetters: () => null,
})
