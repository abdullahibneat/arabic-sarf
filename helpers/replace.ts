const replace = <T extends Object>(
  obj: T,
  searchValue: string | RegExp,
  replaceValue: Record<string, string | undefined>,
) => {
  const ret = JSON.parse(JSON.stringify(obj)) as T

  for (let $key of Object.keys(ret)) {
    const key = $key as keyof T

    const value = ret[key]

    if (!value) continue

    if (typeof value === 'string') {
      ret[key] = value.replace(
        searchValue,
        (character) => replaceValue[character] || character,
      ) as T[keyof T]
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
      }) as T[keyof T]
      continue
    }
  }

  return ret
}

export default replace
