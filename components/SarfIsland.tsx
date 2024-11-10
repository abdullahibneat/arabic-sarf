import Island, { IslandSectionProps } from './Island'
import {
  showJazmAtom,
  showMajhoolAtom,
  showMushtaqqAtom,
  showNasbAtom,
  showSarfSahegerAtom,
} from '@/atoms'
import { useCallback, useEffect, useMemo, useState } from 'react'

import IconButton from './IconButton'
import RootLetters from './RootLetters'
import { SegmentedOption } from './Segmented'
import posthog from 'posthog-js'
import { useAtom } from 'jotai'

enum Section {
  SIDEBAR = 'sidebar',
  VERB_CASE = 'verb-case',
  MAJHOOL = 'majhool',
  VERB = 'verb',
  SARF_TYPE = 'sarf-type',
}

type SarfIslandProps = {
  sarfType?: string
  verbCase?: string | null
  passive?: boolean
  rootLetters?: { ف?: string; ع?: string; ل?: string } | null
  setSarfType?: (sarfType: string | ((sarfType: string) => string)) => void
  setVerbCase?: (
    verbCase: string | null | ((verbCase: string | null) => string | null),
  ) => void
  setPassive?: (passive: boolean | ((passive: boolean) => boolean)) => void
  setRootLetters?: (
    rootLetters:
      | { ف?: string; ع?: string; ل?: string }
      | null
      | ((
          rootLetters: { ف?: string; ع?: string; ل?: string } | null,
        ) => { ف?: string; ع?: string; ل?: string } | null),
  ) => void
}

const SarfIsland = ({
  sarfType,
  verbCase,
  passive,
  rootLetters,
  setSarfType,
  setVerbCase,
  setPassive,
  setRootLetters,
}: SarfIslandProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [showMushtaqq] = useAtom(showMushtaqqAtom)
  const [showSarfSaheger] = useAtom(showSarfSahegerAtom)

  const [showMajhool] = useAtom(showMajhoolAtom)

  const [showJazm] = useAtom(showJazmAtom)
  const [showNasb] = useAtom(showNasbAtom)

  useEffect(() => {
    /**
     * Global keyboard listener:
     * - Ctrl+/: toggle sidebar
     * - Ctrl+\: toggle sidebar
     */
    const keyboardListener = (e: KeyboardEvent) => {
      if (e.key === '/' || e.key === '\\') {
        toggleSidebar()
        return
      }
    }
    window.addEventListener('keydown', keyboardListener)
    return () => window.removeEventListener('keydown', keyboardListener)
  }, [])

  /**
   * Reset options to default when enabled settings are turned off
   */

  useEffect(() => {
    if (!showMushtaqq && sarfType === 'مشتق') {
      setSarfType?.('صرف كبير')
    }
  }, [showMushtaqq, sarfType, setSarfType])

  useEffect(() => {
    if (!showSarfSaheger && sarfType === 'صرف صغير') {
      setSarfType?.('صرف كبير')
    }
  }, [showSarfSaheger, sarfType, setSarfType])

  useEffect(() => {
    if (!showMajhool && passive) {
      setPassive?.(false)
    }
  }, [showMajhool, passive, setPassive])

  useEffect(() => {
    if (!showJazm && verbCase === 'مجزوم') {
      setVerbCase?.(null)
    }
  }, [showJazm, verbCase, setVerbCase])

  useEffect(() => {
    if (!showNasb && verbCase === 'منصوب') {
      setVerbCase?.(null)
    }
  }, [showNasb, verbCase, setVerbCase])

  const sarfTypeOptions = useMemo(() => {
    if (!showMushtaqq && !showSarfSaheger) return []

    const $sarfTypeOptions: SegmentedOption[] = []

    if (showMushtaqq) $sarfTypeOptions.push({ id: 'مشتق', label: 'مشتق' })
    if (showSarfSaheger)
      $sarfTypeOptions.push({ id: 'صرف صغير', label: 'صرف صغير' })
    $sarfTypeOptions.push({ id: 'صرف كبير', label: 'صرف كبير' })

    return $sarfTypeOptions
  }, [showMushtaqq, showSarfSaheger])

  const verbCaseOptions = useMemo(() => {
    if (!showJazm && !showNasb) return []

    const $verbCaseOptions: SegmentedOption[] = []

    if (showJazm) $verbCaseOptions.push({ id: 'مجزوم', icon: 'sukoon' })
    if (showNasb) $verbCaseOptions.push({ id: 'منصوب', icon: 'fatha' })
    $verbCaseOptions.push({ id: 'مرفوع', icon: 'damma' })

    return $verbCaseOptions
  }, [showJazm, showNasb])

  const toggleSidebar = useCallback(() => {
    const sidebar = document.querySelector('aside')?.classList
    const currentlyOpen = sidebar?.contains('open') || false
    setSidebarOpen(!currentlyOpen)
    sidebar?.toggle('open')
  }, [])

  const handleSelectVerbCase = useCallback((option: SegmentedOption) => {
    setVerbCase?.((currentOption) =>
      currentOption === option.id ? null : option.id,
    )
    posthog.capture('Verb Case', { verbCase: option.id })
  }, [])

  const handleSelectSarfType = useCallback((option: SegmentedOption) => {
    setSarfType?.(option.id)
    posthog.capture('Sarf Type', { sarfType: option.id })
  }, [])

  const handleMajhoolChange = useCallback((checked: boolean) => {
    setPassive?.(checked)
    posthog.capture('Majhool', { showMajhool: checked })
  }, [])

  const sections = useMemo(() => {
    const $sections: IslandSectionProps[] = []

    if (sarfTypeOptions.length > 0) {
      $sections.push({
        key: Section.SARF_TYPE,
        type: 'segmented',
        options: sarfTypeOptions,
        selectedId: sarfType,
        onSelectOption: handleSelectSarfType,
      })
    }

    $sections.push({
      key: Section.VERB,
      type: 'custom',
      children: () => (
        <RootLetters
          rootLetters={rootLetters}
          setRootLetters={setRootLetters}
        />
      ),
    })

    if (sarfType === 'صرف كبير' && showMajhool) {
      $sections.push({
        key: Section.MAJHOOL,
        type: 'toggle',
        label: 'مجهول',
        checked: passive,
        onChange: handleMajhoolChange,
      })
    }

    if (sarfType === 'صرف كبير' && verbCaseOptions.length > 0) {
      $sections.push({
        key: Section.VERB_CASE,
        type: 'segmented',
        options: verbCaseOptions,
        selectedId: verbCase,
        onSelectOption: handleSelectVerbCase,
      })
    }

    $sections.push({
      key: Section.SIDEBAR,
      type: 'custom',
      children: () => (
        <IconButton
          className="m-1"
          name="sidebar"
          rotate={sidebarOpen ? 0 : 180}
          onClick={toggleSidebar}
        />
      ),
    })

    return $sections
  }, [
    sarfTypeOptions.length,
    sarfType,
    rootLetters,
    passive,
    verbCaseOptions.length,
    verbCase,
    sidebarOpen,
  ])

  return <Island sections={sections} />
}

export default SarfIsland