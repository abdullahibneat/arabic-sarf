import React, {
  ChangeEventHandler,
  HTMLAttributes,
  useCallback,
  useMemo,
  useState,
} from 'react'
import Segmented, { SegmentedOption } from './Segmented'

import IconButton from './IconButton'
import cx from 'classix'
import { twMerge } from 'tailwind-merge'
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
  const [activeSectionKey, setActiveSectionKey] = useState<string | null>(null)

  const activeSection = useMemo(
    () => sections.find((section) => section.key === activeSectionKey),
    [sections, activeSectionKey],
  )

  const md = useBreakpoint('md')

  return (
    <>
      <IslandWrapper
        className={!md && activeSection ? 'bottom-4 opacity-75' : undefined}
        style={{ transition: 'bottom 250ms, opacity 250ms' }}
      >
        {sections.map((section) => (
          <IslandSection
            key={section.key}
            section={section}
            setActiveSection={setActiveSectionKey}
            md={md}
          />
        ))}
      </IslandWrapper>

      {/* The following Island is only used on mobile for when a section is opened */}
      {!md && activeSection && (
        <IslandWrapper
          style={{
            animation: 'slideIn 250ms forwards',
            transition: 'transform 250ms, opacity 250ms',
          }}
        >
          <IslandSection
            md // Force section to be open on mobile
            key={activeSection.key}
            section={activeSection}
            setActiveSection={setActiveSectionKey}
          />

          <div>
            <IconButton
              className="m-1"
              name="close"
              onClick={() => setActiveSectionKey(null)}
            />
          </div>
        </IslandWrapper>
      )}
    </>
  )
}

export default Island

const IslandWrapper = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={twMerge(
      cx('fixed bottom-6 left-4 right-4 z-10 flex', className),
    )}
  >
    <div className="mx-auto max-w-full rounded-md border-[1px] border-zinc-300 bg-zinc-100 shadow-xl drop-shadow-xl dark:border-neutral-500 dark:bg-neutral-800">
      <div
        dir="ltr" // "rtl" doesn't work well with divide-x
        className="flex divide-x overflow-x-auto dark:divide-neutral-500 [&>*]:shrink-0"
      >
        {children}
      </div>
    </div>
  </div>
)

const IslandSection = ({
  section,
  setActiveSection,
  md,
}: {
  section: IslandSectionProps
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
    // On small screens, only show the selected option, or the first option if none is selected
    return section.selectedId
      ? section.options.filter((option) => option.id == section.selectedId)
      : section.options.slice(0, 1)
  }, [section, md])

  const handleSelectSegmentedOption = useCallback(
    (option: SegmentedOption) => {
      if (section.type !== 'segmented') return

      const selectOption = () => {
        section.onSelectOption?.(option)
      }

      // On large screens, select the option straight away
      if (md) {
        selectOption()
      } else {
        // On small screens, first set this as the active section
        setActiveSection(section.key)
      }
    },
    [section, md],
  )

  const handleToggleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (section.type !== 'toggle') return
      section.onChange?.(e.target.checked)
    },
    [section],
  )

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
        <div
          className={cx(
            twMerge(
              'm-1 flex cursor-pointer select-none gap-1 rounded-md px-2 py-1',
              section.checked && 'bg-white dark:bg-neutral-600',
            ),
          )}
          style={{ transition: 'background-color 250ms' }}
        >
          <label htmlFor={section.key} className="cursor-pointer">
            {section.label}
          </label>

          <input
            id={section.key}
            name={section.key}
            type="checkbox"
            checked={section.checked}
            className="cursor-pointer accent-zinc-900 dark:accent-neutral-300"
            onChange={handleToggleChange}
          />
        </div>
      )}

      {section.type === 'custom' && section.children({ setActiveSection })}
    </div>
  )
}
