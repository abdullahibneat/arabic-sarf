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

  return chapter?.rootLetters.map((rootLetters) => rootLetters.arabic) || []
}

export default useRootLetters
