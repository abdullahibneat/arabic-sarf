import { VerbChapter } from '../../data/types'
import { createContext } from 'preact'

export type ChapterStateContextType = {
  baseChapter: VerbChapter | null
  chapter: VerbChapter | null
  customRootLetters?: { ف?: string; ع?: string; ل?: string } | null
  setCustomRootLetters: (
    rootLetters: { ف?: string; ع?: string; ل?: string } | null,
  ) => void
}

export const ChapterStateContext = createContext<ChapterStateContextType>({
  baseChapter: null,
  chapter: null,
  setCustomRootLetters: () => null,
})
