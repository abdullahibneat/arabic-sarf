import { RootLetter } from '@/data/types'
import { useMemo } from 'react'
import useSarf from './useSarf'
import verbTypes from '@/data'

const useMushtaqqs = () => {
  const { verbType, verbChapter } = useSarf()

  const key = useMemo(() => {
    if (!verbType) return 'all'
    let $key = verbType
    if (verbChapter) $key += `/${verbChapter}`
    return $key
  }, [verbType, verbChapter])

  const allMushtaqqs = useMemo(() => {
    const map: Map<string, Mushtaqq[]> = new Map()

    const all: Mushtaqq[] = []

    for (const [type, chapterMap] of Array.from(verbTypes.entries())) {
      const sarfSagheersForType: Mushtaqq[] = []

      for (const [chapterName, chapter] of Array.from(chapterMap.entries())) {
        const sarfSagheersForChapter: Mushtaqq[] = []

        const sarfSagheer: Mushtaqq = {
          type,
          mujarrad: chapter?.form === 1,
          mazeedFihi: chapter?.form !== 2,
          rootLetters: chapter?.root_letters || [],
          باب: chapterName,
          فاعل: chapter?.مشتق.فاعل || null,
        }

        all.push(sarfSagheer)
        sarfSagheersForChapter.push(sarfSagheer)
        sarfSagheersForType.push(sarfSagheer)

        map.set(`${type}/${chapterName}`, sarfSagheersForChapter)
      }

      map.set(type, sarfSagheersForType)
    }

    map.set('all', all)

    return map
  }, [])

  return allMushtaqqs.get(key) || []
}

export default useMushtaqqs

export type Mushtaqq = {
  type: string
  mujarrad: boolean
  mazeedFihi: boolean
  rootLetters: RootLetter[]
  باب: string
  فاعل: {
    masculine: {
      singular: string
      dual: string
      plural: string
    }
    feminine: {
      singular: string
      dual: string
      plural: string
    }
  } | null
}
