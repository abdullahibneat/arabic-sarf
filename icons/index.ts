import GroupByGender from './GroupByGender'
import GroupByPerson from './GroupByPerson'
import List from './List'

const icons = {
  'group-by-gender': GroupByGender,
  'group-by-person': GroupByPerson,
  list: List,
}

export type IconName = keyof typeof icons

export default icons
