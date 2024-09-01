import Table, { TableProps } from './Table'

import replaceRoots from '@/helpers/replaceRoots'
import { useMemo } from 'react'
import useSarf from '@/hooks/useSarf'

export type IsmFailProps = {
  ismFail?: {
    masculine: {
      singular: string
      dual: string
      plural: string
    }
    feminine: {
      singular: string
      dual: string
      plural: string
    }
  } | null
  defaultRootLetters?: { ف?: string; ع?: string; ل?: string } | null
}

const IsmFail = ({ ismFail, defaultRootLetters }: IsmFailProps) => {
  const { rootLetters } = useSarf()

  const tableData = useMemo<TableProps['data']>(() => {
    if (ismFail == null) return [[['N/A']]]

    const $ismFail = replaceRoots(ismFail, rootLetters || defaultRootLetters)

    return [
      [
        [
          { content: $ismFail.masculine.singular, annotation: '1M' },
          { content: $ismFail.masculine.dual, annotation: '2M' },
          { content: $ismFail.masculine.plural, annotation: '3M' },
        ],
        [
          { content: $ismFail.feminine.singular, annotation: '1F' },
          { content: $ismFail.feminine.dual, annotation: '2F' },
          { content: $ismFail.feminine.plural, annotation: '3F' },
        ],
      ],
    ]
  }, [ismFail, rootLetters, defaultRootLetters])

  return <Table header="فاعل" data={tableData} column />
}

export default IsmFail
