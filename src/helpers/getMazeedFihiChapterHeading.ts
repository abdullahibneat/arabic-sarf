import AppState from '../AppState'

const getMazeedFihiChapterHeading = (form: number) => {
  const roman =
    AppState.getItem('settings').mazeedFihiChapterHeadings === 'roman'

  if (!roman) return form

  const romanMap = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X',
  }

  return romanMap[form] || form
}

export default getMazeedFihiChapterHeading
