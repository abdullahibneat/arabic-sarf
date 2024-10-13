import Table, { TableProps } from './Table'

import replaceRoots from '@/helpers/replaceRoots'
import { useMemo } from 'react'
import useSarf from '@/hooks/useSarf'

export type MasdarProps = {
  masdars?: string[] | null
  defaultRootLetters?: { ف?: string; ع?: string; ل?: string } | null
}

const Masdar = ({ masdars: masdars, defaultRootLetters }: MasdarProps) => {
  const { rootLetters } = useSarf()

  const tableData = useMemo<TableProps['data']>(() => {
    if (!masdars || masdars.length === 0) return [[['N/A']]]

    const $masdars = replaceRoots(masdars, rootLetters || defaultRootLetters)

    return [[$masdars]]
  }, [masdars, rootLetters, defaultRootLetters])

  return <Table header="مصدر" data={tableData} column />
}

export default Masdar
