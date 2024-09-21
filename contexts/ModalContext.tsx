import React, { createContext } from 'react'

export type Modal = {
  id: string
  content: React.ReactNode
}

export type ModalContextType = {
  modals: Modal[]
  setModals: (modals: Modal[] | ((modals: Modal[]) => Modal[])) => void
}

export const ModalContext = createContext<ModalContextType>({
  modals: [],
  setModals: () => null,
})
