import { VerbChapter, VerbTypeMap } from '../../data/types'

import isMujarrad from './isMujarrad'

const getChapters = (verbType: VerbTypeMap | undefined) => {
  if (!verbType) return []

  const chapters: VerbChapter[] = []

  for (const chapter of Object.values(verbType)) {
    if (!chapter) continue

    if (isMujarrad(chapter)) {
      for (const subChapter of Object.values(chapter)) {
        if (subChapter) chapters.push(subChapter)
      }
    } else {
      chapters.push(chapter)
    }
  }

  return chapters
}

export default getChapters
