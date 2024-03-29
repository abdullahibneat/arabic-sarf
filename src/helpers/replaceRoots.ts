import { VerbChapter } from '../../data/types'
import replace from './replace'

const replaceRoots = (
  obj: VerbChapter,
  rootLetters?: { ف?: string; ع?: string; ل?: string },
) => {
  if (!rootLetters)
    rootLetters = {
      ف: obj.archetype.root_letters[0],
      ع: obj.archetype.root_letters[1],
      ل: obj.archetype.root_letters[2],
    }

  const replaced = replace(obj, /[فعل]/g, rootLetters)

  replaced.باب = obj.باب

  replaced.archetype.root_letters = [
    obj.archetype.root_letters[0],
    obj.archetype.root_letters[1],
    obj.archetype.root_letters[2],
  ]

  return replaced
}

export default replaceRoots
