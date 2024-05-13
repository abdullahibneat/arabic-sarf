import { ChapterStateContext } from '../contexts/ChapterStateContext'
import { useContext } from 'preact/hooks'

const useChapterStateContext = () => useContext(ChapterStateContext)

export default useChapterStateContext
