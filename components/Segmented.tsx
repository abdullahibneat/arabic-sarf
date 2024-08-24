import cx from 'classix'
import { twMerge } from 'tailwind-merge'

export type SegmentedOption = {
  id: string
  label: string
  shortLabel?: string
}

export type SegmentedProps = {
  options: SegmentedOption[]
  selectedId?: SegmentedOption['id'] | null
  onSelectOption?: (option: SegmentedOption) => void
}

const Segmented = ({
  options,
  selectedId = null,
  onSelectOption,
}: SegmentedProps) => (
  <div className="flex gap-1 rounded-md bg-zinc-100 p-1">
    {options.map((option) => (
      <button
        key={option.id}
        className={twMerge(
          cx(
            'flex min-w-8 cursor-pointer select-none justify-center rounded-md px-2 py-1',
            selectedId === option.id && 'bg-white',
            selectedId !== option.id &&
              'bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300',
          ),
        )}
        style={{ transition: 'background-color 250ms' }}
        onClick={() => onSelectOption?.(option)}
      >
        {option.label}
      </button>
    ))}
  </div>
)

export default Segmented
