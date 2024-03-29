import { replaceRoots } from '.'
import {
  VerbChapter,
  VerbSighaSecondPerson,
  VerbTasreef,
} from '../../data/types'

export type Flashcard = {
  question: string // يستبشرون
  root_letters: string[] // ب ش ر
  form: number // 10
  pattern: string // استخدم يستخدم
  binya: string // مضارع
  archetype: string // يستبشرون مثل يستخدمون
  person: string
}

type Tasreef = VerbTasreef | { '2nd': VerbSighaSecondPerson }

const generateFlashcards = (
  verbChapter: VerbChapter,
  rootLetters: { ف: string; ع: string; ل: string },
) => {
  const flashcards: Flashcard[] = []

  const archetype = replaceRoots(verbChapter.archetype, {
    ف: verbChapter.archetype.root_letters[0],
    ع: verbChapter.archetype.root_letters[1],
    ل: verbChapter.archetype.root_letters[2],
  })

  const tasreefs: Record<string, Tasreef> = {
    ماضي: verbChapter.conjugations.ماضي.معروف,
    مضارع: verbChapter.conjugations.مضارع.معروف,
    أمر: verbChapter.conjugations.أمر,
  }

  for (const binya of Object.keys(tasreefs)) {
    const tasreef = replaceRoots(tasreefs[binya], rootLetters)
    const archetypeTasreef = replaceRoots(tasreefs[binya], {
      ف: verbChapter.archetype.root_letters[0],
      ع: verbChapter.archetype.root_letters[1],
      ل: verbChapter.archetype.root_letters[2],
    })

    if ('3rd' in tasreef) {
      flashcards.push({
        question: tasreef['3rd']['masculine']['هُوَ'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['3rd']['masculine']['هُوَ']} مثل ${archetypeTasreef['3rd']['masculine']['هُوَ']}`,
        person: 'He',
      })
      flashcards.push({
        question: tasreef['3rd']['masculine']['هُمَا'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['3rd']['masculine']['هُمَا']} مثل ${archetypeTasreef['3rd']['masculine']['هُمَا']}`,
        person: 'They (2 male)',
      })
      flashcards.push({
        question: tasreef['3rd']['masculine']['هُمْ'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['3rd']['masculine']['هُمْ']} مثل ${archetypeTasreef['3rd']['masculine']['هُمْ']}`,
        person: 'They (3+ male)',
      })
      flashcards.push({
        question: tasreef['3rd']['feminine']['هِيَ'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['3rd']['feminine']['هِيَ']} مثل ${archetypeTasreef['3rd']['feminine']['هِيَ']}`,
        person: 'She',
      })
      flashcards.push({
        question: tasreef['3rd']['feminine']['هُمَا'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['3rd']['feminine']['هُمَا']} مثل ${archetypeTasreef['3rd']['feminine']['هُمَا']}`,
        person: 'They (2 female)',
      })
      flashcards.push({
        question: tasreef['3rd']['feminine']['هُنَّ'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['3rd']['feminine']['هُنَّ']} مثل ${archetypeTasreef['3rd']['feminine']['هُنَّ']}`,
        person: 'They (3+ female)',
      })
    }

    if ('2nd' in tasreef) {
      flashcards.push({
        question: tasreef['2nd']['masculine']['أَنْتَ'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['2nd']['masculine']['أَنْتَ']} مثل ${archetypeTasreef['2nd']['masculine']['أَنْتَ']}`,
        person: 'You (male)',
      })
      flashcards.push({
        question: tasreef['2nd']['masculine']['أَنْتُمَا'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['2nd']['masculine']['أَنْتُمَا']} مثل ${archetypeTasreef['2nd']['masculine']['أَنْتُمَا']}`,
        person: 'You (2 male)',
      })
      flashcards.push({
        question: tasreef['2nd']['masculine']['أَنْتُمْ'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['2nd']['masculine']['أَنْتُمْ']} مثل ${archetypeTasreef['2nd']['masculine']['أَنْتُمْ']}`,
        person: 'You (3+ male)',
      })
      flashcards.push({
        question: tasreef['2nd']['feminine']['أَنْتِ'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['2nd']['feminine']['أَنْتِ']} مثل ${archetypeTasreef['2nd']['feminine']['أَنْتِ']}`,
        person: 'You (female)',
      })
      flashcards.push({
        question: tasreef['2nd']['feminine']['أَنْتُمَا'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['2nd']['feminine']['أَنْتُمَا']} مثل ${archetypeTasreef['2nd']['feminine']['أَنْتُمَا']}`,
        person: 'You (2 female)',
      })
      flashcards.push({
        question: tasreef['2nd']['feminine']['أَنْتُنَّ'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['2nd']['feminine']['أَنْتُنَّ']} مثل ${archetypeTasreef['2nd']['feminine']['أَنْتُنَّ']}`,
        person: 'You (3+ female)',
      })
    }

    if ('1st' in tasreef) {
      flashcards.push({
        question: tasreef['1st']['أَنَا'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['1st']['أَنَا']} مثل ${archetypeTasreef['1st']['أَنَا']}`,
        person: 'I',
      })
      flashcards.push({
        question: tasreef['1st']['نَحْنُ'],
        root_letters: [rootLetters.ف, rootLetters.ع, rootLetters.ل],
        form: verbChapter.form,
        pattern: `${archetype.ماضي.معروف} ${archetype.مضارع.معروف}`,
        binya,
        archetype: `${tasreef['1st']['نَحْنُ']} مثل ${archetypeTasreef['1st']['نَحْنُ']}`,
        person: 'We',
      })
    }
  }

  return flashcards
}

export default generateFlashcards
