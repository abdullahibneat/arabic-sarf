import React, {
  ChangeEventHandler,
  useCallback,
  useMemo,
  useState,
} from 'react'
import Segmented, { SegmentedOption } from './Segmented'

import IconButton from './IconButton'
import useBreakpoint from '@/hooks/useBreakpoint'

export type IslandProps = {
  sections: IslandSectionProps[]
}

export type IslandSectionType = 'segmented' | 'toggle' | 'custom'

export type IslandSectionProps = {
  key: string
  type: IslandSectionType
} & (
  | {
      type: 'segmented'
      options: SegmentedOption[]
      selectedId?: string | null
      onSelectOption?: (option: SegmentedOption) => void
    }
  | {
      type: 'toggle'
      label: string
      checked?: boolean
      onChange?: (checked: boolean) => void
    }
  | {
      type: 'custom'
      children: (props: {
        setActiveSection: (
          activeSection:
            | string
            | null
            | ((activeSection: string | null) => string | null),
        ) => void
      }) => React.ReactNode
    }
)

const Island = ({ sections }: IslandProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const md = useBreakpoint('md')

  return (
    <div
      dir="ltr" // "rtl" doesn't work well with divide-x
      className="fixed bottom-6 left-4 right-4 z-10 flex"
    >
      <div className="mx-auto max-w-full rounded-md border-[1px] border-zinc-300 bg-zinc-100 shadow-xl drop-shadow-xl dark:border-neutral-500 dark:bg-neutral-800">
        <div className="flex divide-x overflow-x-auto dark:divide-neutral-500 [&>*]:shrink-0">
          {sections.map((section) => (
            <IslandSection
              key={section.key}
              section={section}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              md={md}
            />
          ))}

          {!md && activeSection && (
            <div>
              <IconButton
                className="m-1"
                name="close"
                onClick={() => setActiveSection(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Island

const IslandSection = ({
  section,
  activeSection,
  setActiveSection,
  md,
}: {
  section: IslandSectionProps
  activeSection?: string | null
  setActiveSection: (
    activeSection:
      | string
      | null
      | ((activeSection: string | null) => string | null),
  ) => void
  md?: boolean
}) => {
  const segmentedOptions = useMemo<SegmentedOption[]>(() => {
    if (section.type !== 'segmented') return []
    // On large screens, show all options
    if (md) return section.options
    // On small screens, only show all options if this section is active...
    if (activeSection === section.key) return section.options
    // ...otherwise, only show the selected option, or the first option if none is selected
    return section.selectedId
      ? section.options.filter((option) => option.id == section.selectedId)
      : section.options.slice(0, 1)
  }, [section, md, activeSection])

  const handleSelectSegmentedOption = useCallback(
    (option: SegmentedOption) => {
      if (section.type !== 'segmented') return

      const selectOption = () => {
        section.onSelectOption?.(option)
      }

      // On large screens, select the option straight away
      if (md || activeSection === section.key) {
        selectOption()
      } else {
        // On small screens, first set this as the active section
        setActiveSection(section.key)
      }
    },
    [section, md, activeSection],
  )

  const handleToggleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (section.type !== 'toggle') return
      section.onChange?.(e.target.checked)
    },
    [section],
  )

  if (!md && activeSection && activeSection !== section.key) {
    return null
  }

  return (
    <div>
      {section.type === 'segmented' && (
        <Segmented
          options={segmentedOptions}
          selectedId={section.selectedId}
          onSelectOption={handleSelectSegmentedOption}
        />
      )}

      {section.type === 'toggle' && (
        <div className="flex p-1">
          <input
            id={section.key}
            name={section.key}
            type="checkbox"
            checked={section.checked}
            className="appearance-none [&:checked+label]:bg-white [&:checked+label]:dark:bg-neutral-600"
            onChange={handleToggleChange}
          />
          <label
            htmlFor={section.key}
            className="cursor-pointer select-none rounded-md px-2 py-1"
            style={{ transition: 'background-color 250ms' }}
          >
            مجهول
          </label>
        </div>
      )}

      {section.type === 'custom' && section.children({ setActiveSection })}
    </div>
  )
}
