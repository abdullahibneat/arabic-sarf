import GroupByGender from './GroupByGender'
import GroupByPerson from './GroupByPerson'
import List from './List'

const largeIcons = {
  'group-by-gender': GroupByGender,
  'group-by-person': GroupByPerson,
  list: List,
}

export type LargeIconName = keyof typeof largeIcons

export default largeIcons
