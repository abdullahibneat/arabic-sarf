import { AmrTasreef, RootLetter, VerbTasreef } from '@/data/types'

import onlyAlphaNumeric from './onlyAlphaNumeric'
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
  searchable: Searchable | false
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

export type Searchable = {
  type: {
    arabic: string
    transliterated: string
  }
  form: {
    number: number // 1, 2, 3, etc...
    roman: string // II, III, IV, etc...
    english: string // 1a, 1b, 1c, etc...
  }
  chapter: {
    arabic: string // نصر, تفعيل, استفعال, etc...
    transliterated: string // nasara, taf'eel, istif'aal, etc...
  }
  root_letters: {
    arabic: string
    transliterated: string
  }[]
}

export const SEARCHABLE_PATHS = [
  'searchable.type.arabic',
  'searchable.type.transliterated',
  'searchable.form.number',
  'searchable.form.roman',
  'searchable.form.english',
  'searchable.chapter.arabic',
  'searchable.chapter.transliterated',
  'searchable.root_letters.arabic',
  'searchable.root_letters.transliterated',
]

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

      let romanForm = mujarrad ? 'I' : toRoman(Number(formNumber)) // II, III, IV, etc...
      let englishForm = mujarrad ? `1${String.fromCharCode(index + 97)}` : '' // 1a, 1b, 1c, etc...
      let arabicForm = baseChapter ? baseChapter.chapter[0] : '' // ن, ض, ف, etc...

      if (mujarrad) {
        if (mujarradHeadings === 'english') {
          form = englishForm
        } else {
          form = arabicForm
        }
      } else if (mazeedFihiNumbering === 'roman') {
        form = romanForm
      }

      if (baseChapter) {
        if (mujarrad && mujarradHeadings !== 'english') {
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
        searchable: baseChapter
          ? {
              type: {
                arabic: onlyAlphaNumeric(type),
                transliterated: onlyAlphaNumeric(
                  baseChapter.transliteratedType,
                ),
              },
              form: {
                number: mujarrad ? 1 : Number(formNumber),
                roman: romanForm,
                english: englishForm,
              },
              chapter: {
                arabic: onlyAlphaNumeric(baseChapter.chapter),
                transliterated: onlyAlphaNumeric(
                  baseChapter.transliteratedChapter,
                ),
              },
              root_letters: baseChapter.root_letters.map(
                ({ arabic: { ف, ع, ل }, transliterated }) => ({
                  arabic: `${ف}${ع}${ل}`,
                  transliterated: onlyAlphaNumeric(transliterated),
                }),
              ),
            }
          : false,
      }
    },
  )
}

export default getChapters
