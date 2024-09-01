import { useContext, useMemo } from 'react'

import { RootLetter } from '@/data/types'
import { SarfContext } from '@/contexts/SarfProvider'
import verbTypes from '@/data'

const useSarfSagheers = () => {
  const { verbType, verbChapter } = useContext(SarfContext)

  const key = useMemo(() => {
    if (!verbType) return 'all'
    let $key = verbType
    if (verbChapter) $key += `/${verbChapter}`
    return $key
  }, [verbType, verbChapter])

  const fullSarfSagheers = useMemo(() => {
    const map: Map<string, SarfSagheer[]> = new Map()

    const all: SarfSagheer[] = []

    for (const [type, chapterMap] of Array.from(verbTypes.entries())) {
      const sarfSagheersForType: SarfSagheer[] = []

      for (const [chapterName, chapter] of Array.from(chapterMap.entries())) {
        const sarfSagheersForChapter: SarfSagheer[] = []

        const hasMajhool = !!chapter?.فعل.ماضي.مجهول.مرفوع

        const sarfSagheer: SarfSagheer = {
          type,
          mujarrad: chapter?.form === 1,
          mazeedFihi: chapter?.form !== 2,
          rootLetters: chapter?.root_letters || [],
          باب: chapterName,
          مصدر: chapter?.مشتق.مصدر[0] || null,
          معروف: {
            ماضي: chapter?.فعل.ماضي.معروف.مرفوع['3rd'].masculine.هُوَ || null,
            مضارع: chapter?.فعل.مضارع.معروف.مرفوع['3rd'].masculine.هُوَ || null,
            فاعل: chapter?.مشتق.فاعل.masculine.singular || null,
          },
          مجهول: hasMajhool
            ? {
                ماضي: String(
                  chapter?.فعل.ماضي.مجهول.مرفوع?.['3rd'].masculine.هُوَ,
                ),
                مضارع: String(
                  chapter?.فعل.مضارع.مجهول.مرفوع?.['3rd'].masculine.هُوَ,
                ),
                مفعول: String(chapter?.مشتق.مفعول.masculine.singular),
              }
            : null,
          أمر: chapter?.فعل.أمر.معروف.مجزوم['2nd'].masculine.أَنْتَ || null,
          نهي: chapter?.فعل.مضارع.معروف.مجزوم['2nd'].masculine.أَنْتَ || null,
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

  return fullSarfSagheers.get(key) || []
}

export default useSarfSagheers

export type SarfSagheer = {
  type: string
  mujarrad: boolean
  mazeedFihi: boolean
  rootLetters: RootLetter[]
  باب: string
  مصدر: string | null
  معروف: {
    ماضي: string | null
    مضارع: string | null
    فاعل: string | null
  }
  مجهول: {
    ماضي: string
    مضارع: string
    مفعول: string
  } | null
  أمر: string | null
  نهي: string | null
}
