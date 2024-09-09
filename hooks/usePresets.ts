import {
  enabledVerbTypesAtom,
  mazeedFihiNumberingAtom,
  mujarradHeadingsAtom,
  showJazmAtom,
  showMajhoolAtom,
  showMazeedFihiAtom,
  showMushtaqqAtom,
  showNasbAtom,
  showSarfSahegerAtom,
  tasreefDisplayModeAtom,
} from '@/atoms'
import { useCallback, useMemo } from 'react'

import { useAtom } from 'jotai'

export type Preset = {
  name: string
  preset: {
    tasreefDisplayMode: string
    mujarradHeadings: string
    mazeedFihiNumbering: string
    enabledVerbTypes: string[]
    showMazeedFihi: boolean
    showSarfSaheger: boolean
    showMushtaqq: boolean
    showNasb: boolean
    showJazm: boolean
    showMajhool: boolean
  }
}

const usePresets = () => {
  const [tasreefDisplayMode, setTasreefDisplayMode] = useAtom(
    tasreefDisplayModeAtom,
  )
  const [mujarradHeadings, setMujarradHeadings] = useAtom(mujarradHeadingsAtom)
  const [mazeedFihiNumbering, setMazeedFihiNumbering] = useAtom(
    mazeedFihiNumberingAtom,
  )
  const [enabledVerbTypes, setEnabledVerbTypes] = useAtom(enabledVerbTypesAtom)
  const [showMazeedFihi, setShowMazeedFihi] = useAtom(showMazeedFihiAtom)
  const [showSarfSaheger, setShowSarfSaheger] = useAtom(showSarfSahegerAtom)
  const [showMushtaqq, setShowMushtaqq] = useAtom(showMushtaqqAtom)
  const [showNasb, setShowNasb] = useAtom(showNasbAtom)
  const [showJazm, setShowJazm] = useAtom(showJazmAtom)
  const [showMajhool, setShowMajhool] = useAtom(showMajhoolAtom)

  const preset = useMemo(() => {
    for (const { name, preset } of presets) {
      if (
        tasreefDisplayMode === preset.tasreefDisplayMode &&
        mujarradHeadings === preset.mujarradHeadings &&
        mazeedFihiNumbering === preset.mazeedFihiNumbering &&
        [...enabledVerbTypes].sort().join(',') ===
          [...preset.enabledVerbTypes].sort().join(',') &&
        showMazeedFihi === preset.showMazeedFihi &&
        showSarfSaheger === preset.showSarfSaheger &&
        showMushtaqq === preset.showMushtaqq &&
        showNasb === preset.showNasb &&
        showJazm === preset.showJazm &&
        showMajhool === preset.showMajhool
      ) {
        return name
      }
    }
    return 'Custom'
  }, [
    tasreefDisplayMode,
    mujarradHeadings,
    mazeedFihiNumbering,
    enabledVerbTypes,
    showMazeedFihi,
    showSarfSaheger,
    showMushtaqq,
    showNasb,
    showJazm,
  ])

  const setPreset = useCallback((presetName: string) => {
    const preset = presets.find(($preset) => $preset.name === presetName)
    if (preset) {
      setTasreefDisplayMode(preset.preset.tasreefDisplayMode)
      setMujarradHeadings(preset.preset.mujarradHeadings)
      setMazeedFihiNumbering(preset.preset.mazeedFihiNumbering)
      setEnabledVerbTypes(preset.preset.enabledVerbTypes)
      setShowMazeedFihi(preset.preset.showMazeedFihi)
      setShowSarfSaheger(preset.preset.showSarfSaheger)
      setShowMushtaqq(preset.preset.showMushtaqq)
      setShowNasb(preset.preset.showNasb)
      setShowJazm(preset.preset.showJazm)
      setShowMajhool(preset.preset.showMajhool)
    }
  }, [])

  return {
    preset,
    setPreset,
  }
}

export default usePresets

export const presets: Preset[] = [
  {
    name: 'Misk - Beginner',
    preset: {
      tasreefDisplayMode: 'list',
      mujarradHeadings: 'english',
      mazeedFihiNumbering: 'english',
      enabledVerbTypes: ['صحيح'],
      showMazeedFihi: false,
      showSarfSaheger: false,
      showMushtaqq: false,
      showNasb: false,
      showJazm: false,
      showMajhool: false,
    },
  },
  {
    name: 'Misk - Intermediate',
    preset: {
      tasreefDisplayMode: 'list',
      mujarradHeadings: 'english',
      mazeedFihiNumbering: 'english',
      enabledVerbTypes: ['صحيح', 'أجوف', 'ناقص', 'مثال', 'مضاعف'],
      showMazeedFihi: true,
      showSarfSaheger: true,
      showMushtaqq: true,
      showNasb: true,
      showJazm: true,
      showMajhool: true,
    },
  },
]
