import verbTypes from '../data'
import { VerbChapter, VerbTasreef } from '../data/types'
import { replaceRoots } from './Helpers'

const processVerbChapter = (
  cells: string[],
  chapterName: string,
  verbChapter: VerbChapter | null,
) => {
  if (!verbChapter) {
    cells.push(chapterName)
    cells.push(' ')
    return
  }

  const [ف, ع, ل] = verbChapter.archetype.root_letters

  const verbChapterWithRoots = replaceRoots(verbChapter, { ف, ع, ل })

  cells.push(
    `${chapterName} - ${verbChapterWithRoots.archetype.ماضي.معروف} ${verbChapterWithRoots.archetype.مضارع.معروف}`,
  )
  cells.push(`Madi`)
  prepareTasreefs(cells, verbChapterWithRoots.conjugations.ماضي.معروف)
  cells.push(`Mudari`)
  prepareTasreefs(cells, verbChapterWithRoots.conjugations.مضارع.معروف)
  cells.push(' ')
}

const prepareTasreefs = (cells: string[], tasreef: VerbTasreef | null) => {
  if (!tasreef) {
    // cells.push(' ')
    return
  }

  cells.push(tasreef['3rd'].masculine['هُوَ'])
  cells.push(tasreef['3rd'].masculine['هُمَا'])
  cells.push(tasreef['3rd'].masculine['هُمْ'])
  cells.push(tasreef['3rd'].feminine['هِيَ'])
  cells.push(tasreef['3rd'].feminine['هُمَا'])
  cells.push(tasreef['3rd'].feminine['هُنَّ'])

  cells.push(tasreef['2nd'].masculine['أَنْتَ'])
  cells.push(tasreef['2nd'].masculine['أَنْتُمَا'])
  cells.push(tasreef['2nd'].masculine['أَنْتُمْ'])
  cells.push(tasreef['2nd'].feminine['أَنْتِ'])
  cells.push(tasreef['2nd'].feminine['أَنْتُمَا'])
  cells.push(tasreef['2nd'].feminine['أَنْتُنَّ'])

  cells.push(tasreef['1st'].أَنَا)
  cells.push(tasreef['1st'].نَحْنُ)
  cells.push('Fluency')
  // cells.push(' ')
}

export const run = () => {
  const cells: string[] = []

  for (const [verbTypeName, verbType] of Object.entries(verbTypes)) {
    // cells.push(verbTypeName) // صحيح, أجوف, ناقص
    // cells.push(' ')

    for (const [chapterName, chapter] of Object.entries(verbType)) {
      if (!chapter || (chapter && 'archetype' in chapter)) {
        processVerbChapter(cells, chapterName, chapter as VerbChapter | null)
      } else {
        // FORM 1
        for (const [form1ChapterName, form1Chapter] of Object.entries(
          chapter,
        )) {
          processVerbChapter(cells, `I`, form1Chapter)
        }
      }
    }

    break
  }

  return cells
}
