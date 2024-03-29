const replace = <T extends Object>(
  obj: T,
  searchValue: string | RegExp,
  replaceValue: Record<string, string | undefined>,
) => {
  const ret = JSON.parse(JSON.stringify(obj)) as T

  for (const key of Object.keys(ret)) {
    const value = ret[key]

    if (!value) continue

    if (typeof value === 'string') {
      ret[key] = value.replace(
        searchValue,
        (character) => replaceValue[character] || character,
      )
      continue
    }

    if (typeof value === 'object') {
      ret[key] = replace(value, searchValue, replaceValue)
    }

    if (Array.isArray(value)) {
      ret[key] = value.map((item: unknown) => {
        if (typeof item === 'string')
          return item.replace(
            searchValue,
            (character) => replaceValue[character] || character,
          )
        if (typeof item === 'object' && item)
          return replace(item, searchValue, replaceValue)
        return item
      })
      continue
    }
  }

  return ret
}

export default replace
