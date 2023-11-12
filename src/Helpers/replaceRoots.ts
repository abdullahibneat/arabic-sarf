import replace from './replace'

const replaceRoots = <T extends Object>(
  obj: T,
  { ف, ع, ل }: { ف?: string; ع?: string; ل?: string },
) => {
  const first = ف ? replace(obj, 'ف', ف) : obj
  const second = ع ? replace(first, 'ع', ع) : first
  const third = ل ? replace(second, 'ل', ل) : second
  console.log(third)
  return third
}

export default replaceRoots
