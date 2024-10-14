import Close from './Close'
import Damma from './Damma'
import Fatha from './Fatha'
import GroupByGender from './GroupByGender'
import GroupByPerson from './GroupByPerson'
import List from './List'
import Sidebar from './Sidebar'
import Sukoon from './Sukoon'

const largeIcons = {
  close: Close,
  damma: Damma,
  fatha: Fatha,
  'group-by-gender': GroupByGender,
  'group-by-person': GroupByPerson,
  list: List,
  sidebar: Sidebar,
  sukoon: Sukoon,
}

export type LargeIconName = keyof typeof largeIcons

export default largeIcons
