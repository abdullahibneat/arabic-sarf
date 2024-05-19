import { VerbChapter } from '../../data/types'
import replace from './replace'

const replaceRoots = (
  obj: VerbChapter,
  rootLetters?: { ف?: string; ع?: string; ل?: string } | null,
) => {
  if (!rootLetters) rootLetters = obj.root_letters[0].arabic

  const replaced = replace(obj, /[فعل]/g, rootLetters)

  replaced.باب = obj.باب
  replaced.type = obj.type
  replaced.root_letters = obj.root_letters

  return replaced
}

export default replaceRoots
