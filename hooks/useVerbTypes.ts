import {
  enabledVerbTypesAtom,
  mazeedFihiNumberingAtom,
  mujarradHeadingsAtom,
} from '@/atoms'

import getChapters from '@/helpers/getChapters'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import verbTypes from '@/data'

const useVerbTypes = () => {
  const [enabledVerbTypes] = useAtom(enabledVerbTypesAtom)
  const [mujarradHeadings] = useAtom(mujarradHeadingsAtom)
  const [mazeedFihiNumbering] = useAtom(mazeedFihiNumberingAtom)

  const allVerbTypes = useMemo(() => Array.from(verbTypes.keys()), [])

  const availableVerbTypes = useMemo(
    () => allVerbTypes.filter((type) => enabledVerbTypes.includes(type)),
    [enabledVerbTypes],
  )

  return Object.fromEntries(
    availableVerbTypes.map((verbType) => [
      verbType,
      getChapters(verbType, { mujarradHeadings, mazeedFihiNumbering }),
    ]),
  )
}

export default useVerbTypes
