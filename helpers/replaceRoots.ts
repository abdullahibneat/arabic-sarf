import replace from './replace'

const replaceRoots = <T extends Object>(
  obj: T,
  rootLetters?: { ف?: string; ع?: string; ل?: string } | null,
): T => {
  if (!rootLetters) return obj

  const replaced = replace(obj, /[فعل]/g, rootLetters)

  return replaced
}

export default replaceRoots
