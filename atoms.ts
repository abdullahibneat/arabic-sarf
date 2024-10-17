import { atomWithStorage } from 'jotai/utils'
import verbTypes from './data'

export const themeAtom = atomWithStorage<'system' | 'light' | 'dark'>(
  'theme',
  'system',
)

export const tasreefDisplayModeAtom = atomWithStorage(
  'tasreefDisplayMode',
  'list',
)

export const fontSizeAtom = atomWithStorage('fontSize', 16)

export const mujarradHeadingsAtom = atomWithStorage(
  'mujarradHeadings',
  'arabic',
)

export const mazeedFihiNumberingAtom = atomWithStorage(
  'mazeedFihiNumbering',
  'roman',
)

export const enabledVerbTypesAtom = atomWithStorage(
  'enabledVerbTypes',
  Array.from(verbTypes.keys()),
)

export const showMazeedFihiAtom = atomWithStorage('showMazeedFihi', true)

export const showSarfSahegerAtom = atomWithStorage('showSarfSaheger', true)

export const showMushtaqqAtom = atomWithStorage('showMushtaqq', true)

export const showNasbAtom = atomWithStorage('showNasb', true)

export const showJazmAtom = atomWithStorage('showJazm', true)

export const showMajhoolAtom = atomWithStorage('showMajhool', true)

export const showRootLetterEditorAtom = atomWithStorage(
  'showRootLetterEditor',
  false,
)

export const audioLoopAtom = atomWithStorage('audioLoop', true)

export const audioPlaybackRateAtom = atomWithStorage('audioPlaybackRate', 1)
