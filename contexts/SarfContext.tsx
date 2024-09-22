import { createContext } from 'react'

export type SarfContextType = {
  /** E.g. 'صحيح' */
  verbType: string | null
  /** E.g. 'نَصَرَ' or '2' */
  verbChapter: string | null
  /** E.g. 'منصوب' */
  verbCase: string | null
  /** E.g. 'صرف كبير' */
  sarfType: string
  passive: boolean
  rootLetters: { ف?: string; ع?: string; ل?: string } | null
  customRootLetters: boolean
}

export const SarfContext = createContext<SarfContextType>({
  verbType: null,
  verbChapter: null,
  verbCase: null,
  sarfType: 'صرف كبير',
  passive: false,
  rootLetters: null,
  customRootLetters: false,
})
