import '../styles/MenuItem.scss'

import Tag from './Tag'
import Text from './Text'

export type MenuItemProps = {
  tag?: string | number
  title: string
  active?: boolean
}

const MenuItem = ({ tag, title, active }: MenuItemProps) => (
  <div class={`menu-item ${active ? 'active' : ''}`}>
    <Text type="small-bold" style={{ flex: 1 }}>
      {title}
    </Text>
    {tag !== undefined && <Tag>{tag}</Tag>}
  </div>
)

export default MenuItem
