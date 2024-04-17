import { ComponentChildren, createContext } from 'preact'

export type ModalProps = {
  title: string
  children: ComponentChildren
}

export type ModalContextType = {
  open: (props: ModalProps) => void
  close: () => void
}

export const ModalContext = createContext<ModalContextType>({
  open: () => {},
  close: () => null,
})
