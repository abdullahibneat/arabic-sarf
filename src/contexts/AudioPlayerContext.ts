import { createContext } from 'preact'

export type AudioPlayerContextType = {
  play: () => Promise<void>
  pause: () => void
  close: () => void
  setSrc: (src: string) => Promise<void>
  test?: () => void
}

export const AudioPlayerContext = createContext<AudioPlayerContextType>({
  play: async () => {},
  pause: () => null,
  close: () => null,
  setSrc: async () => {},
})
