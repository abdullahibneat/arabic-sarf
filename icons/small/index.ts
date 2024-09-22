import Chevron from './Chevron'
import Close from './Close'
import Settings from './Settings'

const smallIcons = {
  chevron: Chevron,
  close: Close,
  settings: Settings,
}

export type SmallIconName = keyof typeof smallIcons

export default smallIcons
