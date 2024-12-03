import IconButton from './IconButton'
import { LargeIconName } from '@/icons/large'
import cx from 'classix'
import { twMerge } from 'tailwind-merge'

export type SegmentedOption<T = string> = {
  id: T
  title?: string
} & (
  | {
      label: string
    }
  | {
      icon: LargeIconName
    }
)

export type SegmentedProps<T> = {
  options: SegmentedOption<T>[]
  selectedId?: T | null
  onSelectOption?: (option: SegmentedOption<T>) => void
}

const Segmented = <T,>({
  options,
  selectedId = null,
  onSelectOption,
}: SegmentedProps<T>) => (
  <div className="flex gap-1 rounded-md bg-zinc-100 p-1 dark:bg-neutral-800">
    {options.map((option) =>
      'icon' in option ? (
        <IconButton
          key={String(option.id)}
          title={option.title}
          className={twMerge(
            cx(
              'flex min-w-8 cursor-pointer select-none justify-center rounded-md py-1',
              selectedId === option.id &&
                'bg-white hover:bg-white dark:bg-neutral-600 dark:hover:bg-neutral-600',
            ),
          )}
          name={option.icon}
          onClick={() => onSelectOption?.(option)}
        />
      ) : (
        <button
          key={String(option.id)}
          title={option.title}
          className={twMerge(
            cx(
              'flex min-w-8 cursor-pointer select-none justify-center rounded-md py-1',
              'label' in option && 'px-2',
              selectedId === option.id && 'bg-white dark:bg-neutral-600',
              selectedId !== option.id &&
                'bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600',
            ),
          )}
          style={{ transition: 'background-color 250ms' }}
          onClick={() => onSelectOption?.(option)}
        >
          {option.label}
        </button>
      ),
    )}
  </div>
)

export default Segmented
