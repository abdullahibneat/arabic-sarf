import List from './List'
import { VerbChapter } from '../../data/types'

type Props = {
  chapter: VerbChapter
}

const Masdar = ({
  chapter: {
    مشتق: { مصضر },
  },
}: Props) => {
  return <List header="مصضر" cells={مصضر} />
}

export default Masdar
