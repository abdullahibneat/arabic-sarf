import isMujarrad from './isMujarrad'
import verbTypes from '../../data'

const getChapter = (params: {
  type?: string
  form?: string
  chapter?: string
}) => {
  const type = verbTypes[params.type || '']

  if (!type) return null

  const form = type[params.form || '']

  if (!form) return null

  const chapter = isMujarrad(form) ? form[params.chapter || ''] : form

  return chapter ?? null
}

export default getChapter
