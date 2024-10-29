import Chevron from './Chevron'
import Close from './Close'
import Loop from './Loop'
import Pause from './Pause'
import Play from './Play'
import Radio from './Radio'
import RadioChecked from './RadioChecked'
import Search from './Search'
import Settings from './Settings'

const smallIcons = {
  chevron: Chevron,
  close: Close,
  loop: Loop,
  play: Play,
  pause: Pause,
  radio: Radio,
  'radio-checked': RadioChecked,
  search: Search,
  settings: Settings,
}

export type SmallIconName = keyof typeof smallIcons

export default smallIcons
