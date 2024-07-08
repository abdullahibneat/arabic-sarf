import List from './List'
import { VerbChapter } from '../../data/types'

type Props = {
  chapter: VerbChapter
}

const Masdar = ({
  chapter: {
    مشتق: { مصدر },
  },
}: Props) => {
  return <List header="مصدر" cells={مصدر} />
}

export default Masdar
