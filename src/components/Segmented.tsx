import '../styles/Segmented.scss'

import Text from './Text'

export type SegmentedOption = {
  label: string
  value: string | number | boolean
}

type Props<T extends SegmentedOption> = {
  value?: T['value'] | null
  options: T[] | Readonly<T[]>
  disabled?: boolean
  onChange?: (option: T) => void
}

const Segmented = <T extends SegmentedOption = SegmentedOption>({
  value,
  options,
  disabled,
  onChange,
}: Props<T>) => {
  return (
    <div class={`segmented-container ${disabled ? 'disabled' : ''}`}>
      {options.map((option) => (
        <div
          key={String(option.value)}
          class={`segment ${option.value === value ? 'active' : ''}`}
          onClick={disabled ? undefined : () => onChange?.(option)}
        >
          <Text type="small" style={{ color: 'inherit' }}>
            {option.label}
          </Text>
        </div>
      ))}
    </div>
  )
}

export default Segmented
