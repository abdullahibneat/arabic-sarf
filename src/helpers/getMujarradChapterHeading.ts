import AppState from '../AppState'

const getMujarradChapterHeading = (chapter: string) => {
  const arabic =
    AppState.getItem('settings').mujarradChapterHeadings === 'arabic'

  const letters = ['a', 'b', 'c', 'd', 'e', 'f']

  switch (chapter) {
    case 'نَصَرَ':
      return arabic ? 'ن' : `1${letters[0]}`

    case 'ضَرَبَ':
      return arabic ? 'ض' : `1${letters[1]}`

    case 'فَتَحَ':
      return arabic ? 'ف' : `1${letters[2]}`

    case 'سَمِعَ':
      return arabic ? 'س' : `1${letters[3]}`

    case 'حَسِبَ':
      return arabic ? 'ح' : `1${letters[4]}`

    case 'كَرُمَ':
      return arabic ? 'ك' : `1${letters[5]}`

    default:
      return ''
  }
}

export default getMujarradChapterHeading
