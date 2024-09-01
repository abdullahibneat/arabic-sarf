import { createContext } from 'react'

export type SarfContextType = {
  verbType: string | null // e.g. 'صحيح'
  verbChapter: string | null // e.g. 'نَصَرَ' or '2'
  verbCase: string | null // e.g. 'منصوب'
  sarfType: string // e.g. 'صرف كبير'
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
