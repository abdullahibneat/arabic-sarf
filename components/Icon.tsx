import largeIcons, { LargeIconName } from '@/icons/large'
import smallIcons, { SmallIconName } from '@/icons/small'

export type IconProps = {
  className?: string
  rotate?: number
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

const Icon = ({ className, name, size, rotate = 0 }: IconProps) => {
  const IconComponent = size === 'small' ? smallIcons[name] : largeIcons[name]

  return (
    <div
      className={className}
      style={{
        transform: `rotate(${rotate}deg)`,
        transition: 'transform 250ms, color 250ms',
      }}
    >
      <IconComponent />
    </div>
  )
}

export default Icon
