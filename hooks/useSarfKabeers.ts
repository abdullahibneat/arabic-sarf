import { AmrTasreef, RootLetter, VerbChapter, VerbTasreef } from '@/data/types'
import { useContext, useMemo } from 'react'

import { SarfContext } from '@/contexts/SarfProvider'
import verbTypes from '@/data'

const useSarfKabeers = () => {
  const { verbType, verbChapter, verbCase, passive } = useContext(SarfContext)

  const key = useMemo(() => {
    if (!verbType) return 'all'
    let $key = verbType
    if (verbChapter) $key += `/${verbChapter}`
    return $key
  }, [verbType, verbChapter])

  const fullSarfKabeers = useMemo(() => {
    const map: Map<string, FullSarfKabeer[]> = new Map()

    const all: FullSarfKabeer[] = []

    for (const [type, chapterMap] of Array.from(verbTypes.entries())) {
      const sarfKabeersForType: FullSarfKabeer[] = []

      for (const [chapterName, chapter] of Array.from(chapterMap.entries())) {
        const sarfKabeersForChapter: FullSarfKabeer[] = []

        const hasMajhool = !!chapter?.فعل.ماضي.مجهول.مرفوع

        const sarfKabeer: FullSarfKabeer = {
          type,
          mujarrad: chapter?.form === 1,
          mazeedFihi: chapter?.form !== 2,
          rootLetters: chapter?.root_letters || [],
          باب: chapterName,
          معروف: {
            ماضي: chapter?.فعل.ماضي.معروف.مرفوع || null,
            مضارع: {
              مرفوع: chapter?.فعل.مضارع.معروف.مرفوع || null,
              منصوب: chapter?.فعل.مضارع.معروف.منصوب || null,
              مجزوم: chapter?.فعل.مضارع.معروف.مجزوم || null,
            },
          },
          مجهول: hasMajhool
            ? {
                ماضي: chapter.فعل.ماضي.مجهول.مرفوع as VerbTasreef,
                مضارع: {
                  مرفوع: chapter.فعل.مضارع.مجهول.مرفوع as VerbTasreef,
                  منصوب: chapter.فعل.مضارع.مجهول.منصوب as VerbTasreef,
                  مجزوم: chapter.فعل.مضارع.مجهول.مجزوم as VerbTasreef,
                },
              }
            : null,
          أمر: chapter?.فعل.أمر.معروف.مجزوم || null,
        }

        all.push(sarfKabeer)
        sarfKabeersForChapter.push(sarfKabeer)
        sarfKabeersForType.push(sarfKabeer)

        map.set(`${type}/${chapterName}`, sarfKabeersForChapter)
      }

      map.set(type, sarfKabeersForType)
    }

    map.set('all', all)

    return map
  }, [])

  const simpleSarfKabeers = useMemo<SimpleSarfKabeer[]>(() => {
    const sarfKabeers = fullSarfKabeers.get(key) || []
    return sarfKabeers.map(
      ({ type, mujarrad, mazeedFihi, rootLetters, باب, معروف, مجهول, أمر }) => {
        const ماضي = (passive ? مجهول : معروف)?.ماضي || null
        const مضارع =
          (passive ? مجهول : معروف)?.مضارع?.[verbCase || 'مرفوع'] || null

        return {
          type,
          mujarrad,
          mazeedFihi,
          rootLetters,
          باب,
          ماضي,
          مضارع,
          أمر,
        }
      },
    )
  }, [key, passive, verbCase])

  return simpleSarfKabeers
}

export default useSarfKabeers

type Tasreef = VerbTasreef | null

export type FullSarfKabeer = {
  type: string
  mujarrad: boolean
  mazeedFihi: boolean
  rootLetters: RootLetter[]
  باب: string
  معروف: {
    ماضي: Tasreef
    مضارع: Record<string, Tasreef>
  }
  مجهول: {
    ماضي: Tasreef
    مضارع: Record<string, Tasreef>
  } | null
  أمر: AmrTasreef | null
}

export type SimpleSarfKabeer = {
  type: string
  mujarrad: boolean
  mazeedFihi: boolean
  rootLetters: RootLetter[]
  باب: string
  ماضي: Tasreef | null
  مضارع: Tasreef | null
  أمر: AmrTasreef | null
}
