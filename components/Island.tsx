import Segmented, { SegmentedOption } from './Segmented'
import { useCallback, useMemo, useState } from 'react'

import cx from 'classix'
import { twMerge } from 'tailwind-merge'
import useLargeBreakpoint from '@/hooks/useLargeBreakpoint'

enum Section {
  SIDEBAR = 'sidebar',
  VERB_CASE = 'verb-case',
  MAJHOOL = 'majhool',
  VERB = 'verb',
  SARF_TYPE = 'sarf-type',
}

type IslandProps = {
  sarfType?: string
  verbCase?: string | null
  passive?: boolean
  setSarfType?: (sarfType: string | ((sarfType: string) => string)) => void
  setVerbCase?: (
    verbCase: string | null | ((verbCase: string | null) => string | null),
  ) => void
  setPassive?: (passive: boolean | ((passive: boolean) => boolean)) => void
}

const Island = ({
  sarfType,
  verbCase,
  passive,
  setSarfType,
  setVerbCase,
  setPassive,
}: IslandProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<Section | null>(null)

  const lg = useLargeBreakpoint()

  const sarfTypeOptions = useMemo(() => {
    const allSarfTypeOptions: SegmentedOption[] = [
      { id: 'مشتق', label: 'مشتق' },
      { id: 'صرف صغير', label: 'صرف صغير' },
      { id: 'صرف كبير', label: 'صرف كبير' },
    ] as const

    // On small screens, only show the selected option, unless the active section is sarf-type
    if (!lg && activeSection !== Section.SARF_TYPE) {
      return allSarfTypeOptions.filter((option) => option.id == sarfType)
    }

    return allSarfTypeOptions
  }, [activeSection, lg, sarfType])

  const verbCaseOptions = useMemo(() => {
    const allVerbCaseOptions: SegmentedOption[] = [
      { id: 'مجزوم', label: 'ـْ' },
      { id: 'منصوب', label: 'ـَ' },
      { id: 'مرفوع', label: 'ـُ' },
    ] as const

    // On small screens, only show the selected option, unless the active section is verb-case
    if (!lg && activeSection !== Section.VERB_CASE) {
      if (verbCase === null) return allVerbCaseOptions.slice(-1)
      return allVerbCaseOptions.filter((option) => option.id == verbCase)
    }

    return allVerbCaseOptions
  }, [activeSection, lg, verbCase])

  const toggleSidebar = useCallback(() => {
    const sidebar = document.querySelector('aside')?.classList
    const currentlyOpen = sidebar?.contains('open') || false
    setActiveSection(currentlyOpen ? null : Section.SIDEBAR)
    setSidebarOpen(!currentlyOpen)
    sidebar?.toggle('open')
  }, [])

  const handleSelectVerbCase = useCallback(
    (option: SegmentedOption) => {
      const selectOption = () =>
        setVerbCase?.((currentOption) =>
          currentOption === option.id ? null : option.id,
        )

      // On large screens, select the option straight away
      if (lg || activeSection === Section.VERB_CASE) {
        selectOption()
        setActiveSection(null)
      } else {
        // On small screens, first set this as the active section
        setActiveSection(Section.VERB_CASE)
      }
    },
    [setVerbCase, lg, activeSection],
  )

  const handleSelectSarfType = useCallback(
    (option: SegmentedOption) => {
      const selectOption = () => setSarfType?.(option.id)

      // On large screens, select the option straight away
      if (lg || activeSection === Section.SARF_TYPE) {
        selectOption()
        setActiveSection(null)
      } else {
        // On small screens, first set this as the active section
        setActiveSection(Section.SARF_TYPE)
      }
    },
    [setSarfType, lg, activeSection],
  )

  return (
    <div
      dir="ltr" // "rtl" doesn't work well with divide-x
      className="fixed bottom-6 left-4 right-4 flex h-[42px] md:sticky md:top-[calc(100%-42px)]"
    >
      <div className="mx-auto max-w-full rounded-md border-[1px] border-zinc-200 bg-zinc-100 shadow-xl drop-shadow-xl">
        <div className="flex divide-x overflow-x-auto [&>*]:shrink-0">
          <IslandSection name={Section.SARF_TYPE} activeSection={activeSection}>
            <Segmented
              options={sarfTypeOptions}
              selectedId={sarfType}
              onSelectOption={handleSelectSarfType}
            />
          </IslandSection>

          <IslandSection name={Section.VERB} activeSection={activeSection}>
            <select className="m-1 h-8 rounded-md bg-zinc-900 px-1 text-white">
              <option>نَصَرَ يَنْصُرُ</option>
            </select>
          </IslandSection>

          <IslandSection name={Section.MAJHOOL} activeSection={activeSection}>
            <div className="flex p-1">
              <input
                id={Section.MAJHOOL}
                name={Section.MAJHOOL}
                type="checkbox"
                checked={passive}
                className="appearance-none [&:checked+label]:bg-white"
                onChange={(e) => setPassive?.(e.target.checked)}
              />
              <label
                htmlFor={Section.MAJHOOL}
                className="cursor-pointer select-none rounded-md px-2 py-1"
                style={{ transition: 'background-color 250ms' }}
              >
                مجهول
              </label>
            </div>
          </IslandSection>

          <IslandSection name={Section.VERB_CASE} activeSection={activeSection}>
            <Segmented
              options={verbCaseOptions}
              selectedId={verbCase}
              onSelectOption={handleSelectVerbCase}
            />
          </IslandSection>

          <IslandSection
            mobileOnly
            name={Section.SIDEBAR}
            activeSection={activeSection}
          >
            <button
              className="m-1 flex w-8 cursor-pointer select-none items-center justify-center rounded-md px-2 py-1 hover:bg-zinc-200 active:bg-zinc-300"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? '×' : '≡'}
            </button>
          </IslandSection>

          {!lg && activeSection && activeSection !== Section.SIDEBAR && (
            <IslandSection>
              <button
                className="m-1 flex w-8 cursor-pointer select-none items-center justify-center rounded-md px-2 py-1 hover:bg-zinc-200 active:bg-zinc-300"
                onClick={() => setActiveSection(null)}
              >
                ×
              </button>
            </IslandSection>
          )}
        </div>
      </div>
    </div>
  )
}

export default Island

const IslandSection = ({
  name,
  mobileOnly,
  activeSection,
  onClick,
  children,
}: {
  name?: Section
  mobileOnly?: boolean
  activeSection?: string | null
  children: React.ReactNode
  onClick?: () => void
}) => (
  <div
    className={twMerge(
      cx(
        'hidden lg:block',
        (!activeSection || activeSection === name) && 'block',
        mobileOnly && !activeSection && 'block md:hidden lg:hidden',
      ),
    )}
    onClick={onClick}
  >
    {children}
  </div>
)
