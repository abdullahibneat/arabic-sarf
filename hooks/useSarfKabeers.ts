import { AmrTasreef, VerbChapter, VerbTasreef } from '@/data/types'
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

        if (chapter) {
          const hasMajhool = !!chapter.فعل.ماضي.مجهول.مرفوع

          const sarfKabeer: FullSarfKabeer = {
            معروف: {
              ماضي: {
                name: chapterName,
                tasreef: chapter.فعل.ماضي.معروف.مرفوع,
              },
              مضارع: {
                مرفوع: {
                  name: chapterName,
                  tasreef: chapter.فعل.مضارع.معروف.مرفوع,
                },
                منصوب: {
                  name: chapterName,
                  tasreef: chapter.فعل.مضارع.معروف.منصوب,
                },
                مجزوم: {
                  name: chapterName,
                  tasreef: chapter.فعل.مضارع.معروف.مجزوم,
                },
              },
            },
            مجهول: hasMajhool
              ? {
                  ماضي: {
                    name: chapterName,
                    tasreef: chapter.فعل.ماضي.مجهول.مرفوع as VerbTasreef,
                  },
                  مضارع: {
                    مرفوع: {
                      name: chapterName,
                      tasreef: chapter.فعل.مضارع.مجهول.مرفوع as VerbTasreef,
                    },
                    منصوب: {
                      name: chapterName,
                      tasreef: chapter.فعل.مضارع.مجهول.منصوب as VerbTasreef,
                    },
                    مجزوم: {
                      name: chapterName,
                      tasreef: chapter.فعل.مضارع.مجهول.مجزوم as VerbTasreef,
                    },
                  },
                }
              : null,
            أمر: { name: chapterName, tasreef: chapter.فعل.أمر.معروف.مجزوم },
          }

          all.push(sarfKabeer)
          sarfKabeersForChapter.push(sarfKabeer)
          sarfKabeersForType.push(sarfKabeer)
        }

        map.set(`${type}/${chapterName}`, sarfKabeersForChapter)
      }

      map.set(type, sarfKabeersForType)
    }

    map.set('all', all)

    return map
  }, [])

  const simpleSarfKabeers = useMemo<SimpleSarfKabeer[]>(() => {
    const sarfKabeers = fullSarfKabeers.get(key) || []
    return sarfKabeers.map(({ معروف, مجهول, أمر }) => {
      const ماضي = (passive ? مجهول : معروف)?.ماضي || {
        name: 'asd',
        tasreef: null,
      }
      const مضارع = (passive ? مجهول : معروف)?.مضارع?.[verbCase || 'مرفوع'] || {
        name: 'asd',
        tasreef: null,
      }
      return {
        ماضي,
        مضارع,
        أمر,
      }
    })
  }, [key, passive, verbCase])

  return {
    sarfKabeers: fullSarfKabeers.get(key),
    simpleSarfKabeers,
  }
}

export default useSarfKabeers

export type Tasreef = {
  name: string
  tasreef: VerbTasreef
}

export type OptionalTasreef = {
  name: string
  tasreef: VerbTasreef | null | undefined
}

export type FullSarfKabeer = {
  معروف: {
    ماضي: Tasreef
    مضارع: Record<string, OptionalTasreef>
  }
  مجهول: {
    ماضي: Tasreef
    مضارع: Record<string, OptionalTasreef>
  } | null
  أمر: Omit<Tasreef, 'tasreef'> & { tasreef: AmrTasreef }
}

export type SimpleSarfKabeer = {
  ماضي: OptionalTasreef
  مضارع: OptionalTasreef
  أمر: Omit<Tasreef, 'tasreef'> & { tasreef: AmrTasreef }
}
