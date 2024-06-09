import verbTypes from '../../data'

const getChapter = (params: { type?: string; form?: string }) => {
  if (!params.type || !params.form) return null

  const type = verbTypes.get(params.type)

  if (!type) return null

  const form = type.get(params.form)

  return form ?? null
}

export default getChapter
