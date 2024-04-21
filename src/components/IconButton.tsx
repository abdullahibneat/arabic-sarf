import '../styles/IconButton.scss'

import Icon, { IconProps } from './Icon'

import { JSX } from 'preact'

export type IconButtonProps = IconProps & {
  title?: string
  active?: boolean
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>
}

const IconButton = ({
  title,
  active,
  onClick,
  ...iconProps
}: IconButtonProps) => (
  <button
    class={`icon-button ${active ? 'active' : ''}`}
    title={title}
    onClick={onClick}
  >
    <Icon padding={4} {...iconProps} />
  </button>
)

export default IconButton
