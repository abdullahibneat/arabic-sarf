import { AmrTasreef, VerbTasreef } from '@/data/types'
import Table, { TableProps } from './Table'

import { useMemo } from 'react'

export type TasreefProps = {
  name: string
  tasreef?: VerbTasreef | AmrTasreef | null
  mode?: 'list' | 'by-person' | 'by-gender'
}

const Tasreef = ({ name, tasreef, mode = 'list' }: TasreefProps) => {
  const tableData = useMemo<TableProps['data'] | null>(() => {
    if (tasreef == null) return null

    const thirdPersonMasculine = [
      {
        content: '3rd' in tasreef ? tasreef['3rd'].masculine.هُوَ : '',
        annotation: 1,
      },
      {
        content: '3rd' in tasreef ? tasreef['3rd'].masculine.هُمَا : '',
        annotation: 2,
      },
      {
        content: '3rd' in tasreef ? tasreef['3rd'].masculine.هُمْ : '',
        annotation: 3,
      },
    ]

    const thirdPersonFeminine = [
      {
        content: '3rd' in tasreef ? tasreef['3rd'].feminine.هِيَ : '',
        annotation: 4,
      },
      {
        content: '3rd' in tasreef ? tasreef['3rd'].feminine.هُمَا : '',
        annotation: 5,
      },
      {
        content: '3rd' in tasreef ? tasreef['3rd'].feminine.هُنَّ : '',
        annotation: 6,
      },
    ]

    const secondPersonMasculine = [
      { content: tasreef['2nd'].masculine.أَنْتَ, annotation: 7 },
      { content: tasreef['2nd'].masculine.أَنْتُمَا, annotation: 8 },
      { content: tasreef['2nd'].masculine.أَنْتُمْ, annotation: 9 },
    ]

    const secondPersonFeminine = [
      { content: tasreef['2nd'].feminine.أَنْتِ, annotation: 10 },
      { content: tasreef['2nd'].feminine.أَنْتُمَا, annotation: 11 },
      { content: tasreef['2nd'].feminine.أَنْتُنَّ, annotation: 12 },
    ]

    const firstPerson = [
      {
        content: '1st' in tasreef ? tasreef['1st'].أَنَا : '',
        annotation: 13,
      },
      {
        content: '1st' in tasreef ? tasreef['1st'].نَحْنُ : '',
        annotation: 14,
      },
    ]

    if (mode === 'by-person') {
      return [
        [
          thirdPersonMasculine.concat(thirdPersonFeminine),
          secondPersonMasculine.concat(secondPersonFeminine),
        ],
        [firstPerson],
      ]
    }

    return [
      [thirdPersonMasculine, thirdPersonFeminine],
      [secondPersonMasculine, secondPersonFeminine],
      [firstPerson],
    ]
  }, [tasreef, mode])

  if (!tableData) return null

  return <Table header={name} data={tableData} column={mode === 'list'} />
}

export default Tasreef
