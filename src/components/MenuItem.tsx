import '../styles/MenuItem.scss'

import { JSX } from 'preact'
import Tag from './Tag'
import Text from './Text'

export type MenuItemProps = {
  tag?: string | number
  title: string
  active?: boolean
  onClick?: JSX.MouseEventHandler<HTMLDivElement>
}

const MenuItem = ({ tag, title, active, onClick }: MenuItemProps) => (
  <div class={`menu-item ${active ? 'active' : ''}`} onClick={onClick}>
    <Text type="small-medium" style={{ flex: 1 }}>
      {title}
    </Text>
    {tag !== undefined && <Tag>{tag}</Tag>}
  </div>
)

export default MenuItem
