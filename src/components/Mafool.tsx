import List, { ListSection } from './List'

import { VerbChapter } from '../../data/types'
import { useMemo } from 'preact/hooks'

type Props = {
  chapter: VerbChapter
}

const Mafool = ({
  chapter: {
    مشتق: { مفعول },
  },
}: Props) => {
  const sections = useMemo<ListSection[]>(() => {
    const $sections: [ListSection, ListSection] = [[], []]

    if (مفعول.masculine.singular)
      $sections[0].push({ text: مفعول.masculine.singular, prefix: '1M' })
    if (مفعول.masculine.dual)
      $sections[0].push({ text: مفعول.masculine.dual, prefix: '2M' })
    if (مفعول.masculine.plural)
      $sections[0].push({ text: مفعول.masculine.plural, prefix: '3M' })

    if (مفعول.feminine.singular)
      $sections[1].push({ text: مفعول.feminine.singular, prefix: '1F' })
    if (مفعول.feminine.dual)
      $sections[1].push({ text: مفعول.feminine.dual, prefix: '2F' })
    if (مفعول.feminine.plural)
      $sections[1].push({ text: مفعول.feminine.plural, prefix: '3F' })

    return $sections
  }, [مفعول])

  return <List header="مفعول" sections={sections} />
}

export default Mafool
