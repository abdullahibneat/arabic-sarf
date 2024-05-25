import getChapter from '../helpers/getChapter'
import { useMemo } from 'preact/hooks'
import { useParams } from 'react-router-dom'

const useRouteChapter = () => {
  const params = useParams()

  const chapter = useMemo(() => getChapter(params), [params])

  return chapter
}

export default useRouteChapter
