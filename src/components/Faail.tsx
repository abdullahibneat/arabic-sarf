import List, { ListSection } from './List'

import { VerbChapter } from '../../data/types'
import { useMemo } from 'preact/hooks'

type Props = {
  chapter: VerbChapter
}

const Faail = ({
  chapter: {
    مشتق: { فاعل },
  },
}: Props) => {
  const sections = useMemo<ListSection[]>(() => {
    return [
      [
        { text: فاعل.masculine.singular, prefix: '1M' },
        { text: فاعل.masculine.dual, prefix: '2M' },
        { text: فاعل.masculine.plural, prefix: '3M' },
      ],
      [
        { text: فاعل.feminine.singular, prefix: '1F' },
        { text: فاعل.feminine.dual, prefix: '2F' },
        { text: فاعل.feminine.plural, prefix: '3F' },
      ],
    ]
  }, [فاعل])

  return <List header="فاعل" sections={sections} />
}

export default Faail
