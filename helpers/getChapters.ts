import { AmrTasreef, RootLetter, VerbTasreef } from '@/data/types'

import replaceRoots from '@/helpers/replaceRoots'
import toRoman from '@/helpers/toRoman'
import verbTypes from '@/data'

export type Chapter = {
  key: string
  type: string
  form: string
  name: string
  mujarrad: boolean
  mazeedFihi: boolean
  rootLetters: RootLetter[]
  sarfKabeer: SarfKabeer | null
  sarfSagheer: SarfSagheer | null
  mushtaqq: Mushtaqq
}

export type Tasreef = VerbTasreef | null

export type SarfKabeer = {
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

export type SarfSagheer = {
  مصدر: string
  معروف: {
    ماضي: string
    مضارع: string
    فاعل: string | null
  }
  مجهول: {
    ماضي: string
    مضارع: string
    مفعول: string
  } | null
  أمر: string
  نهي: string
}

export type Mushtaqq = {
  مصدر: string[] | null
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
  مفعول: {
    masculine: {
      singular: string | null
      dual: string | null
      plural: string | null
    }
    feminine: {
      singular: string | null
      dual: string | null
      plural: string | null
    }
  } | null
}

type Options = {
  mujarradHeadings?: string
  mazeedFihiNumbering?: string
}

const getChapters = (
  type: string,
  { mujarradHeadings, mazeedFihiNumbering }: Options = {},
): Chapter[] => {
  const chapters = verbTypes.get(type)

  if (!chapters) return []

  return Array.from(chapters.entries()).map(
    ([formNumber, baseChapter], index) => {
      const chapter = baseChapter
        ? replaceRoots(baseChapter, baseChapter.root_letters[0].arabic)
        : null

      const mazeedFihi = Number(formNumber) > 1
      const mujarrad = !mazeedFihi

      let form = formNumber

      if (mujarrad) {
        if (mujarradHeadings === 'english') {
          // 1a, 1b, 1c, etc.
          form = `1${String.fromCharCode(index + 97)}`
        }
      } else if (mazeedFihiNumbering === 'roman') {
        form = toRoman(Number(form))
      }

      if (baseChapter) {
        if (mujarrad && mujarradHeadings !== 'english') {
          // ن, ض, ف, etc...
          form = baseChapter.chapter[0]
        }
      }

      const hasMajhool = !!baseChapter?.فعل.ماضي.مجهول.مرفوع

      const sarfKabeer: Chapter['sarfKabeer'] = baseChapter
        ? {
            معروف: {
              ماضي: baseChapter.فعل.ماضي.معروف.مرفوع,
              مضارع: {
                مرفوع: baseChapter.فعل.مضارع.معروف.مرفوع,
                منصوب: baseChapter.فعل.مضارع.معروف.منصوب,
                مجزوم: baseChapter.فعل.مضارع.معروف.مجزوم,
              },
            },
            مجهول: hasMajhool
              ? {
                  ماضي: baseChapter.فعل.ماضي.مجهول.مرفوع as VerbTasreef,
                  مضارع: {
                    مرفوع: baseChapter.فعل.مضارع.مجهول.مرفوع as VerbTasreef,
                    منصوب: baseChapter.فعل.مضارع.مجهول.منصوب as VerbTasreef,
                    مجزوم: baseChapter.فعل.مضارع.مجهول.مجزوم as VerbTasreef,
                  },
                }
              : null,
            أمر: baseChapter.فعل.أمر.معروف.مجزوم,
          }
        : null

      const sarfSagheer: Chapter['sarfSagheer'] = baseChapter
        ? {
            مصدر: baseChapter.مشتق.مصدر[0],
            معروف: {
              ماضي: baseChapter.فعل.ماضي.معروف.مرفوع['3rd'].masculine.هُوَ,
              مضارع: baseChapter.فعل.مضارع.معروف.مرفوع['3rd'].masculine.هُوَ,
              فاعل: baseChapter.مشتق.فاعل.masculine.singular,
            },
            مجهول: hasMajhool
              ? {
                  ماضي: String(
                    baseChapter.فعل.ماضي.مجهول.مرفوع?.['3rd'].masculine.هُوَ,
                  ),
                  مضارع: String(
                    baseChapter.فعل.مضارع.مجهول.مرفوع?.['3rd'].masculine.هُوَ,
                  ),
                  مفعول: String(baseChapter.مشتق.مفعول?.masculine.singular),
                }
              : null,
            أمر: baseChapter.فعل.أمر.معروف.مجزوم['2nd'].masculine.أَنْتَ,
            نهي: baseChapter.فعل.مضارع.معروف.مجزوم['2nd'].masculine.أَنْتَ,
          }
        : null

      const mushtaqq: Mushtaqq = {
        مصدر: baseChapter?.مشتق.مصدر || null,
        فاعل: baseChapter?.مشتق.فاعل || null,
        مفعول: baseChapter?.مشتق.مفعول || null,
      }

      return {
        key: `${type}/${formNumber}`,
        type,
        form,
        name: chapter?.title || 'N/A',
        mujarrad,
        mazeedFihi,
        rootLetters: baseChapter?.root_letters || [],
        sarfKabeer,
        sarfSagheer,
        mushtaqq,
      }
    },
  )
}

export default getChapters
