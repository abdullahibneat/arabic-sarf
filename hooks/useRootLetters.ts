import { useMemo } from 'react'
import useSarf from './useSarf'
import verbTypes from '@/data'

const useRootLetters = () => {
  const { verbType, verbChapter } = useSarf()

  const rootLetters = useMemo(() => {
    if (!verbType || !verbChapter) return []

    const type = verbTypes.get(verbType)

    if (!type) return []

    const chapter = type.get(verbChapter)

    if (!chapter) return []

    return chapter.root_letters.map((rootLetters) => rootLetters.arabic)
  }, [verbType, verbChapter])

  return rootLetters
}

export default useRootLetters
