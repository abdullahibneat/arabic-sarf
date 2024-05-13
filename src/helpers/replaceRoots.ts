import { VerbChapter } from '../../data/types'
import replace from './replace'

const replaceRoots = (
  obj: VerbChapter,
  rootLetters?: { ف?: string; ع?: string; ل?: string } | null,
) => {
  if (!rootLetters)
    rootLetters = {
      ف: obj.root_letters[0].arabic[0],
      ع: obj.root_letters[0].arabic[1],
      ل: obj.root_letters[0].arabic[2],
    }

  const replaced = replace(obj, /[فعل]/g, rootLetters)

  replaced.باب = obj.باب

  replaced.root_letters = obj.root_letters

  return replaced
}

export default replaceRoots
