import icons from '@/icons'

export type IconProps = {
  name: keyof typeof icons
  className?: string
}

const Icon = ({ name, className }: IconProps) => {
  const IconComponent = icons[name]

  return (
    <div className={className}>
      <IconComponent />
    </div>
  )
}

export default Icon
