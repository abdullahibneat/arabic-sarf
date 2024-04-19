import '../styles/MenuItem.scss'

import Icon from './Icon'
import { JSX } from 'preact'
import MicroIcons from '../icons/micro'
import Tag from './Tag'
import Text from './Text'

export type MenuItemProps = {
  tag?: string | number
  title: string
  active?: boolean
  icon?: keyof typeof MicroIcons
  onClick?: JSX.MouseEventHandler<HTMLDivElement>
}

const MenuItem = ({ tag, title, active, icon, onClick }: MenuItemProps) => (
  <div class={`menu-item ${active ? 'active' : ''}`} onClick={onClick}>
    {icon && <Icon size="micro" name={icon} />}
    <Text type="small-medium" style={{ flex: 1 }}>
      {title}
    </Text>
    {tag !== undefined && <Tag>{tag}</Tag>}
  </div>
)

export default MenuItem
