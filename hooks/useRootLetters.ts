import { useMemo } from 'react'
import useSarf from './useSarf'
import useVerbTypes from './useVerbTypes'

const useRootLetters = () => {
  const { verbType, verbChapter } = useSarf()

  const verbTypes = useVerbTypes()

  const chapter = useMemo(() => {
    if (!verbType) return null
    const chapters = verbTypes[verbType] || []
    return chapters.find(
      (chapter) => chapter.key === `${verbType}/${verbChapter}`,
    )
  }, [verbTypes, verbType, verbChapter])

  const rootLetters = useMemo(() => {
    if (!chapter) return []
    return chapter.rootLetters.map((rootLetters) => rootLetters.arabic) || []
  }, [chapter])

  return rootLetters
}

export default useRootLetters
