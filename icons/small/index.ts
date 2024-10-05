import Chevron from './Chevron'
import Close from './Close'
import Radio from './Radio'
import RadioChecked from './RadioChecked'
import Settings from './Settings'

const smallIcons = {
  chevron: Chevron,
  close: Close,
  settings: Settings,
  radio: Radio,
  'radio-checked': RadioChecked,
}

export type SmallIconName = keyof typeof smallIcons

export default smallIcons
