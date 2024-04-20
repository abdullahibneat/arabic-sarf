import { VerbChapter } from '../../data/types'

const isMujarrad = (
  obj: Record<string, VerbChapter | undefined> | VerbChapter | null | undefined,
): obj is Record<string, VerbChapter | undefined> => {
  if (!obj) return false
  if ('باب' in obj) return false
  return true
}

export default isMujarrad
