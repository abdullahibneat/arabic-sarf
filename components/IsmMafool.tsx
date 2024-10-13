import Table, { TableProps } from './Table'

import replaceRoots from '@/helpers/replaceRoots'
import { useMemo } from 'react'
import useSarf from '@/hooks/useSarf'

export type IsmMafoolProps = {
  ismMafool?: {
    masculine: {
      singular: string | null
      dual: string | null
      plural: string | null
    }
    feminine: {
      singular: string | null
      dual: string | null
      plural: string | null
    }
  } | null
  defaultRootLetters?: { ف?: string; ع?: string; ل?: string } | null
}

const IsmMafool = ({ ismMafool, defaultRootLetters }: IsmMafoolProps) => {
  const { rootLetters } = useSarf()

  const tableData = useMemo<TableProps['data']>(() => {
    if (!ismMafool) return [[['N/A']]]

    const $ismMafool = replaceRoots(
      ismMafool,
      rootLetters || defaultRootLetters,
    )

    return [
      [
        [
          { content: $ismMafool.masculine.singular || '', annotation: '1M' },
          { content: $ismMafool.masculine.dual || '', annotation: '2M' },
          { content: $ismMafool.masculine.plural || '', annotation: '3M' },
        ],
        [
          { content: $ismMafool.feminine.singular || '', annotation: '1F' },
          { content: $ismMafool.feminine.dual || '', annotation: '2F' },
          { content: $ismMafool.feminine.plural || '', annotation: '3F' },
        ],
      ],
    ]
  }, [ismMafool, rootLetters, defaultRootLetters])

  return <Table header="مفعول" data={tableData} column />
}

export default IsmMafool
