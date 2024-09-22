import largeIcons, { LargeIconName } from '@/icons/large'
import smallIcons, { SmallIconName } from '@/icons/small'

export type IconProps = {
  className?: string
} & (
  | {
      size?: 'large'
      name: LargeIconName
    }
  | {
      size: 'small'
      name: SmallIconName
    }
)

const Icon = ({ name, size, className }: IconProps) => {
  const IconComponent = size === 'small' ? smallIcons[name] : largeIcons[name]

  return (
    <div className={className}>
      <IconComponent />
    </div>
  )
}

export default Icon
