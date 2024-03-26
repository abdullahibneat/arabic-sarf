import '../styles/IconButton.scss'

import Icon, { IconProps } from './Icon'

import { JSX } from 'preact'

export type IconButtonProps = IconProps & {
  active?: boolean
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>
}

const IconButton = ({ active, onClick, ...iconProps }: IconButtonProps) => (
  <button class={`icon-button ${active ? 'active' : ''}`} onClick={onClick}>
    <Icon {...iconProps} />
  </button>
)

export default IconButton
