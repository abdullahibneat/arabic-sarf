import Chevron from './Chevron'
import Close from './Close'
import Loop from './Loop'
import Pause from './Pause'
import Play from './Play'
import Radio from './Radio'
import RadioChecked from './RadioChecked'
import Settings from './Settings'

const smallIcons = {
  chevron: Chevron,
  close: Close,
  loop: Loop,
  play: Play,
  pause: Pause,
  settings: Settings,
  radio: Radio,
  'radio-checked': RadioChecked,
}

export type SmallIconName = keyof typeof smallIcons

export default smallIcons
