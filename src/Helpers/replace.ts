const replace = <T extends Object>(
  obj: T,
  searchValue: string,
  replaceValue: string,
) => {
  const ret = JSON.parse(JSON.stringify(obj)) as T

  for (const key of Object.keys(ret)) {
    if (!ret[key]) continue

    if (typeof ret[key] === 'string') {
      ret[key] = ret[key].replaceAll(searchValue, replaceValue)
      continue
    }

    if (Array.isArray(ret[key])) {
      ret[key] = ret[key].map((item) =>
        item.replaceAll(searchValue, replaceValue),
      )
      continue
    }

    if (typeof ret[key] === 'object') {
      ret[key] = replace(ret[key], searchValue, replaceValue)
    }
  }

  return ret
}

export default replace
