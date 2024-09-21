import { AmrTasreef, VerbTasreef } from '@/data/types'
import Table, { TableProps } from './Table'

import replaceRoots from '@/helpers/replaceRoots'
import { tasreefDisplayModeAtom } from '@/atoms'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import useSarf from '@/hooks/useSarf'

export type TasreefProps = {
  name: string
  tasreef?: VerbTasreef | AmrTasreef | null
  defaultRootLetters?: { ف?: string; ع?: string; ل?: string } | null
  disabled?: boolean
}

const Tasreef = ({
  name,
  tasreef,
  defaultRootLetters,
  disabled,
}: TasreefProps) => {
  const { rootLetters } = useSarf()

  const [mode] = useAtom(tasreefDisplayModeAtom)

  const tableData = useMemo<TableProps['data']>(() => {
    const $tasreef =
      tasreef && replaceRoots(tasreef, rootLetters || defaultRootLetters)

    const thirdPersonMasculine = [
      {
        content:
          $tasreef && '3rd' in $tasreef ? $tasreef['3rd'].masculine.هُوَ : '',
        annotation: 1,
      },
      {
        content:
          $tasreef && '3rd' in $tasreef ? $tasreef['3rd'].masculine.هُمَا : '',
        annotation: 2,
      },
      {
        content:
          $tasreef && '3rd' in $tasreef ? $tasreef['3rd'].masculine.هُمْ : '',
        annotation: 3,
      },
    ].map((cell) => ({ ...cell, disabled }))

    const thirdPersonFeminine = [
      {
        content:
          $tasreef && '3rd' in $tasreef ? $tasreef['3rd'].feminine.هِيَ : '',
        annotation: 4,
      },
      {
        content:
          $tasreef && '3rd' in $tasreef ? $tasreef['3rd'].feminine.هُمَا : '',
        annotation: 5,
      },
      {
        content:
          $tasreef && '3rd' in $tasreef ? $tasreef['3rd'].feminine.هُنَّ : '',
        annotation: 6,
      },
    ].map((cell) => ({ ...cell, disabled }))

    const secondPersonMasculine = [
      { content: $tasreef?.['2nd'].masculine.أَنْتَ || '', annotation: 7 },
      { content: $tasreef?.['2nd'].masculine.أَنْتُمَا || '', annotation: 8 },
      { content: $tasreef?.['2nd'].masculine.أَنْتُمْ || '', annotation: 9 },
    ].map((cell) => ({ ...cell, disabled }))

    const secondPersonFeminine = [
      { content: $tasreef?.['2nd'].feminine.أَنْتِ || '', annotation: 10 },
      { content: $tasreef?.['2nd'].feminine.أَنْتُمَا || '', annotation: 11 },
      { content: $tasreef?.['2nd'].feminine.أَنْتُنَّ || '', annotation: 12 },
    ].map((cell) => ({ ...cell, disabled }))

    const firstPerson = [
      {
        content: $tasreef && '1st' in $tasreef ? $tasreef['1st'].أَنَا : '',
        annotation: 13,
      },
      {
        content: $tasreef && '1st' in $tasreef ? $tasreef['1st'].نَحْنُ : '',
        annotation: 14,
      },
    ].map((cell) => ({ ...cell, disabled }))

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
  }, [tasreef, rootLetters, defaultRootLetters, mode, disabled])

  return <Table header={name} data={tableData} column={mode === 'list'} />
}

export default Tasreef
