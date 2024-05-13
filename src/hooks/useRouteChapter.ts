import isMujarrad from '../helpers/isMujarrad'
import { useMemo } from 'preact/hooks'
import { useParams } from 'react-router-dom'
import verbTypes from '../../data'

const useRouteChapter = () => {
  const params = useParams()

  const chapter = useMemo(() => {
    const type = verbTypes[params.type || '']

    if (!type) return null

    const form = type[params.form || '']

    if (!form) return null

    const chapter = isMujarrad(form) ? form[params.chapter || ''] : form

    return chapter ?? null
  }, [params.type, params.form, params.chapter])

  return chapter
}

export default useRouteChapter
