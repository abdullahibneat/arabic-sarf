import Chevron from './Chevron'
import Close from './Close'
import Flashcards from './Flashcards'
import Loop from './Loop'
import Menu from './Menu'
import Pause from './Pause'
import Play from './Play'
import Radio from './Radio'
import RadioChecked from './RadioChecked'
import Search from './Search'
import Settings from './Settings'

const smallIcons = {
  chevron: Chevron,
  close: Close,
  flashcards: Flashcards,
  loop: Loop,
  menu: Menu,
  play: Play,
  pause: Pause,
  radio: Radio,
  'radio-checked': RadioChecked,
  search: Search,
  settings: Settings,
}

export type SmallIconName = keyof typeof smallIcons

export default smallIcons
