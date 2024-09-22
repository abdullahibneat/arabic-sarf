import Icon, { IconProps } from './Icon'

import cx from 'classix'
import { twMerge } from 'tailwind-merge'

export type IconButtonProps = IconProps & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const IconButton = ({ className, onClick, ...iconProps }: IconButtonProps) => {
  return (
    <button
      className={twMerge(
        cx(
          'flex cursor-pointer items-center justify-center rounded-md hover:bg-zinc-200 active:bg-zinc-300',
          iconProps.size === 'small' && 'h-6 w-6',
          iconProps.size !== 'small' && 'h-8 w-8',
          className,
        ),
      )}
      style={{ transition: 'background-color 250ms' }}
      onClick={onClick}
    >
      <Icon {...iconProps} />
    </button>
  )
}

export default IconButton
