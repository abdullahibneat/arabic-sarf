import Icon, { IconProps } from './Icon'

import cx from 'classix'
import { twMerge } from 'tailwind-merge'

export type IconButtonProps = IconProps & {
  title?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const IconButton = ({
  title,
  className,
  onClick,
  ...iconProps
}: IconButtonProps) => {
  return (
    <button
      title={title}
      className={twMerge(
        cx(
          'flex flex-shrink-0 cursor-pointer items-center justify-center rounded-md hover:bg-zinc-200 active:bg-zinc-300 dark:hover:bg-neutral-700 dark:active:bg-neutral-600',
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
