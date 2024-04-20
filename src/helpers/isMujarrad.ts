import { VerbChapter } from '../../data/types'

const isMujarrad = (
  chapter:
    | Record<string, VerbChapter | undefined>
    | VerbChapter
    | null
    | undefined,
): chapter is Record<string, VerbChapter | undefined> => {
  if (!chapter) return false
  if ('باب' in chapter) return false
  return true
}

export default isMujarrad
