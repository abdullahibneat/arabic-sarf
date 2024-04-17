import '../styles/Icon.scss'

import DefaultIcons from '../icons/default'
import MicroIcons from '../icons/micro'
import { useMemo } from 'preact/hooks'

export type IconProps = {
  size?: 'default' | 'micro'
  color?: 'white' | 'text' | 'text' | 'text-secondary' | 'hover' | 'border'
  hoverColor?: 'white' | 'text' | 'text' | 'text-secondary' | 'hover' | 'border'
  padding?: number
} & (
  | { size?: 'default' | never; name: keyof typeof DefaultIcons }
  | { size: 'micro'; name: keyof typeof MicroIcons }
)

const Icon = ({
  size = 'default',
  name,
  color = 'text',
  hoverColor = 'text',
  padding,
}: IconProps) => {
  const IconComponent = useMemo(() => {
    if (size === 'micro') return MicroIcons[name]
    return DefaultIcons[name]
  }, [size, name])

  return (
    <div
      class="icon-container"
      style={{
        '--base-fill': `var(--${color})`,
        '--hover-fill': `var(--${hoverColor})`,
        padding,
      }}
    >
      <IconComponent />
    </div>
  )
}

export default Icon
