export type RadioOption = {
  id: string
  label: string
}

export type RadioProps = {
  name: string
  options: RadioOption[]
  selectedId?: RadioOption['id'] | null
  onSelectOption?: (option: RadioOption) => void
}

const Radio = ({
  name,
  options,
  selectedId = null,
  onSelectOption,
}: RadioProps) => (
  <div className="flex flex-col">
    {options.map((option) => (
      <div key={option.id} className="flex items-center gap-2">
        <input
          type="radio"
          id={`${name}-${option.id}`}
          value={option.id}
          className="accent-zinc-900"
          checked={selectedId === option.id}
          onChange={() => onSelectOption?.(option)}
        />
        <label
          htmlFor={`${name}-${option.id}`}
          className="flex-1 select-none text-sm"
        >
          {option.label}
        </label>
      </div>
    ))}
  </div>
)

export default Radio
