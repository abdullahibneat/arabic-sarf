import { Flashcard } from './generateFlashcards'

const downloadFlashcardsAsText = (
  flashcards: Flashcard[],
  fileName: string,
) => {
  const lines: string[] = []

  for (const flashcard of flashcards) {
    lines.push(`# ${flashcard.question}`)
    lines.push(`- Root letters: ${flashcard.root_letters.join(', ')}`)
    lines.push(`- Form: ${flashcard.form}`)
    lines.push(`- Pattern: ${flashcard.pattern}`)
    lines.push(`- Binya: ${flashcard.binya}`)
    lines.push(`- Archetype Sīghah: ${flashcard.archetype}`)
    lines.push(`- Translation: TODO`)
    lines.push('')
    lines.push('')
  }

  /**
   * The following code will download the `csv` string into a csv file
   */
  var element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(lines.join(`\n`)),
  )
  element.setAttribute('download', `${fileName}.txt`)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export default downloadFlashcardsAsText
