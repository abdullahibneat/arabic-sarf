import { ComponentChildren, createContext } from 'preact'

export type ModalProps = {
  title: string
  width?: number | string
  maxWidth?: number | string
  height?: number | string
  maxHeight?: number | string
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
