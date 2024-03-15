import { Flashcard } from './generateFlashcards'

const downloadFlashcardsAsCsv = (flashcards: Flashcard[], fileName: string) => {
  let csv = `"QUESTION","ANSWER"`

  const answers = flashcards.map((flashcard, i) => [
    flashcard.question,
    [
      `Root letters: ${flashcard.root_letters.join(', ')}`,
      `Form: ${flashcard.form}`,
      `Pattern: ${flashcard.pattern}`,
      `Binya: ${flashcard.binya}`,
      `Archetype Sīghah: ${flashcard.archetype}`,
      `Translation: He did`,
    ].join(`\n`),
  ])

  let i = 2

  for (const [question, answer] of answers) {
    csv += `\n"${question}","${answer}"`
    i += 1
  }

  /**
   * The following code will download the `csv` string into a csv file
   */
  var element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(csv),
  )
  element.setAttribute('download', `${fileName}.csv`)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export default downloadFlashcardsAsCsv
