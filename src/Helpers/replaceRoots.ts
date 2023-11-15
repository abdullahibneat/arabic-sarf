import replace from './replace'

const replaceRoots = <T extends Object>(
  obj: T,
  rootLetters: { ف?: string; ع?: string; ل?: string },
) => {
  return replace(obj, /[فعل]/g, rootLetters)
}

export default replaceRoots
