import { AmrTasreef, VerbTasreef } from '@/data/types'

import { Chapter } from './getChapters'
import replaceRoots from './replaceRoots'

export type Flashcard = {
  key: string
  term: string
  definition: {
    rootLetters: string[]
    form: string
    binya: string
    person: string
  }
}

const generateFlashcards = (
  chapter: Chapter,
  rootLetters?: { ف?: string; ع?: string; ل?: string } | null,
) => {
  if (!chapter.sarfKabeer) return []
  if (!rootLetters) rootLetters = chapter.rootLetters[0].arabic

  const sarfKabeer = replaceRoots(chapter.sarfKabeer, rootLetters)

  const tasreefs: Array<{ binya: string; tasreef: VerbTasreef | AmrTasreef }> =
    [
      { binya: 'ماضي', tasreef: sarfKabeer.معروف.ماضي },
      { binya: 'مضارع', tasreef: sarfKabeer.معروف.مضارع.مرفوع },
      { binya: 'أمر', tasreef: sarfKabeer.أمر },
    ]

  const flashcards: Flashcard[] = []

  const generateFlashcard = (binya: string, pronoun: string, term: string) => {
    flashcards.push({
      key: String(flashcards.length),
      term,
      definition: {
        rootLetters: [
          String(rootLetters.ف),
          String(rootLetters.ع),
          String(rootLetters.ل),
        ],
        form: chapter.form,
        binya,
        person: pronoun,
      },
    })
  }

  for (const { binya, tasreef } of tasreefs) {
    for (const [, person] of Object.entries(tasreef)) {
      for (const [pronounOrGender, value] of Object.entries(person)) {
        if (typeof value === 'string') {
          // أَنَا, نَحْنُ
          generateFlashcard(binya, pronounOrGender, value)
        } else if (typeof value === 'object') {
          // All other pronouns
          for (const [pronoun, term] of Object.entries(value)) {
            generateFlashcard(binya, pronoun, String(term))
          }
        }
      }
    }
  }

  return flashcards
}

export default generateFlashcards
