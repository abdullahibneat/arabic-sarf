import {
  VerbChapter,
  VerbSighaSecondPerson,
  VerbTasreef,
} from '../../data/types'

import asEnglishPronoun from './asEnglishPronoun'
import generateEnglishConjugations from './generateEnglishConjugations'

export type Seegha = {
  rootLetters: { ف: string; ع: string; ل: string }
  type: string
  form: number
  pattern: string // nasara yansuru
  tasreef: string // madi, mudari
  voice?: string
  case: string
  pronoun: string
  person: string
  gender?: string
  conjugation: string
  archetype: string
  english: string
}

const getSeeghas = ({
  archetypeChapter,
  chapter,
  rootLetters: arabicRootLetters,
  tense,
  voice = 'معروف',
  case: verbCase,
}: {
  archetypeChapter: VerbChapter
  chapter?: VerbChapter
  rootLetters?: { ف: string; ع: string; ل: string }
  tense: string
  voice?: string
  case: string
}): Seegha[] => {
  const persons = {
    '3rd': {
      masculine: ['هُوَ', 'هُمَا', 'هُمْ'],
      feminine: ['هِيَ', 'هُمَا', 'هُنَّ'],
    },
    '2nd': {
      masculine: ['أَنْتَ', 'أَنْتُمَا', 'أَنْتُمْ'],
      feminine: ['أَنْتِ', 'أَنْتُمَا', 'أَنْتُنَّ'],
    },
    '1st': ['أَنَا', 'نَحْنُ'],
  }

  if (!chapter) {
    chapter = archetypeChapter
  }

  if (!arabicRootLetters) {
    arabicRootLetters = chapter.root_letters[0].arabic
  }

  const rootLetters = chapter.root_letters.find(
    (rootLetters) =>
      rootLetters.arabic.ف === arabicRootLetters.ف &&
      rootLetters.arabic.ع === arabicRootLetters.ع &&
      rootLetters.arabic.ل === arabicRootLetters.ل,
  )

  const tasreef:
    | VerbTasreef
    | { '2nd': VerbSighaSecondPerson }
    | null
    | undefined = chapter.فعل[tense]?.[voice]?.[verbCase]

  const archetypeTasreef:
    | VerbTasreef
    | { '2nd': VerbSighaSecondPerson }
    | null
    | undefined = archetypeChapter.فعل[tense]?.[voice]?.[verbCase]

  const englishConjugations = rootLetters
    ? generateEnglishConjugations(rootLetters.english)
    : null

  const englishTasreef = englishConjugations
    ? tense === 'أمر'
      ? englishConjugations[tense]
      : englishConjugations[tense][voice]
    : null

  const seeghas: Seegha[] = []

  for (const [person, obj] of Object.entries(persons)) {
    if (Array.isArray(obj)) {
      // 1st person
      for (const pronoun of obj) {
        seeghas.push({
          rootLetters: rootLetters?.arabic || arabicRootLetters,
          type: chapter.type,
          form: chapter.form,
          pattern: chapter.title,
          tasreef: tense,
          voice,
          case: verbCase,
          pronoun,
          person,
          // gender?: string
          conjugation: String(tasreef?.[person]?.[pronoun] ?? ''),
          archetype: String(archetypeTasreef?.[person]?.[pronoun] ?? ''),
          english: englishTasreef
            ? (tense === 'أمر' ? '' : asEnglishPronoun(pronoun) + ' ') +
              String(englishTasreef?.[person]?.[pronoun])
            : '(not available for custom root letters)',
        })
      }
    } else {
      // 3rd person or 2nd person
      for (const [gender, pronouns] of Object.entries(obj)) {
        for (const pronoun of pronouns) {
          seeghas.push({
            rootLetters: rootLetters?.arabic || arabicRootLetters,
            type: chapter.type,
            form: chapter.form,
            pattern: chapter.title,
            tasreef: tense,
            voice,
            case: verbCase,
            pronoun,
            person,
            gender,
            conjugation: String(tasreef?.[person]?.[gender]?.[pronoun] ?? ''),
            archetype: String(
              archetypeTasreef?.[person]?.[gender]?.[pronoun] ?? '',
            ),
            english: englishTasreef
              ? (tense === 'أمر' ? '' : asEnglishPronoun(pronoun) + ' ') +
                String(englishTasreef?.[person]?.[gender]?.[pronoun])
              : '(not available for custom root letters)',
          })
        }
      }
    }
  }

  return seeghas
}

export default getSeeghas
