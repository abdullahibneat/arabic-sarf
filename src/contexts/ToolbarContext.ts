import { ComponentChildren, createContext } from 'preact'

export type ToolbarContextType = {
  show: (children: ComponentChildren) => void
  close: () => void
}

export const ToolbarContext = createContext<ToolbarContextType>({
  show: () => null,
  close: () => null,
})
