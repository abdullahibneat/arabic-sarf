import Flex from '../components/Flex'
import Tasreef from '../components/Tasreef'
import isVerbChapter from '../helpers/isVerbChapter'
import { useMemo } from 'preact/hooks'
import verbTypes from '../../data'

const Home = () => {
  const { صحيح } = verbTypes

  const verbChapters = useMemo(
    () =>
      Object.values(صحيح).flatMap((value) => {
        if (!value) return []
        if (isVerbChapter(value)) return value
        return Object.values(value)
      }),
    [صحيح],
  )

  return (
    <Flex gap={32} padding={32} direction="rtl" overflowX="auto">
      {verbChapters.map((verbChapter) => (
        <Tasreef key={verbChapter.باب} verbChapter={verbChapter} />
      ))}
    </Flex>
  )
}

export default Home
