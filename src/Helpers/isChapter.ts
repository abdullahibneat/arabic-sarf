import { VerbChapter } from '../../data/types'

const isChapter = (
  obj?: VerbChapter | Record<string, VerbChapter> | null,
): obj is VerbChapter => {
  return !!obj && 'باب' in obj
}

export default isChapter
