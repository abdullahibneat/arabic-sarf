import React, { createContext } from 'react'

export type Modal = {
  id: string
  content: React.ReactNode
}

export type ModalContextType = {
  present: (modal: Modal) => () => void
  dismiss: (id: string) => void
}

export const ModalContext = createContext<ModalContextType>({
  present: () => () => null,
  dismiss: () => null,
})
