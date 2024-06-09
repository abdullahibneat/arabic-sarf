import { VerbChapter } from '../../data/types'

const getChapters = (verbType: Map<string, VerbChapter | null | undefined>) => {
  if (!verbType) return []

  const chapters: VerbChapter[] = []

  for (const chapter of verbType.values()) {
    if (!chapter) continue
    chapters.push(chapter)
  }

  return chapters
}

export default getChapters
