import { AmrTasreef, VerbTasreef } from '@/data/types'
import Table, { TableProps } from './Table'
import { tasreefDisplayModeAtom, tasreefPronounsAtom } from '@/atoms'
import { useCallback, useMemo } from 'react'

import AudioPlayer from './AudioPlayer'
import replaceRoots from '@/helpers/replaceRoots'
import { useAtom } from 'jotai'
import useSarf from '@/hooks/useSarf'

export type TasreefProps = {
  name: string
  audio?: string | null
  tasreef?: VerbTasreef | AmrTasreef | null
  defaultRootLetters?: { ف?: string; ع?: string; ل?: string } | null
  disabled?: boolean
}

const Tasreef = ({
  name,
  audio,
  tasreef,
  defaultRootLetters,
  disabled,
}: TasreefProps) => {
  const { rootLetters } = useSarf()

  const [mode] = useAtom(tasreefDisplayModeAtom)
  const [tasreefPronouns] = useAtom(tasreefPronounsAtom)

  const getAnnotation = useCallback(
    (index: number) => {
      const arabicPronouns = [
        'هُوَ',
        'هُمَا',
        'هُمْ',
        'هِيَ',
        'هُمَا',
        'هُنَّ',
        'أَنْتَ',
        'أَنْتُمَا',
        'أَنْتُمْ',
        'أَنْتِ',
        'أَنْتُمَا',
        'أَنْتُنَّ',
        'أَنَا',
        'نَحْنُ',
      ]
      if (tasreefPronouns === 'numeric') return index + 1
      if (tasreefPronouns === 'arabic') return arabicPronouns[index]
      return null
    },
    [tasreefPronouns],
  )

  const tableData = useMemo<TableProps['data']>(() => {
    const $tasreef =
      tasreef && replaceRoots(tasreef, rootLetters || defaultRootLetters)

    const thirdPersonMasculine = [
      {
        content:
          $tasreef && '3rd' in $tasreef ? $tasreef['3rd'].masculine.هُوَ : '',
        annotation: getAnnotation(0),
      },
      {
        content:
          $tasreef && '3rd' in $tasreef ? $tasreef['3rd'].masculine.هُمَا : '',
        annotation: getAnnotation(1),
      },
      {
        content:
          $tasreef && '3rd' in $tasreef ? $tasreef['3rd'].masculine.هُمْ : '',
        annotation: getAnnotation(2),
      },
    ].map((cell) => ({ ...cell, disabled }))

    const thirdPersonFeminine = [
      {
        content:
          $tasreef && '3rd' in $tasreef ? $tasreef['3rd'].feminine.هِيَ : '',
        annotation: getAnnotation(3),
      },
      {
        content:
          $tasreef && '3rd' in $tasreef ? $tasreef['3rd'].feminine.هُمَا : '',
        annotation: getAnnotation(4),
      },
      {
        content:
          $tasreef && '3rd' in $tasreef ? $tasreef['3rd'].feminine.هُنَّ : '',
        annotation: getAnnotation(5),
      },
    ].map((cell) => ({ ...cell, disabled }))

    const secondPersonMasculine = [
      {
        content: $tasreef?.['2nd'].masculine.أَنْتَ || '',
        annotation: getAnnotation(6),
      },
      {
        content: $tasreef?.['2nd'].masculine.أَنْتُمَا || '',
        annotation: getAnnotation(7),
      },
      {
        content: $tasreef?.['2nd'].masculine.أَنْتُمْ || '',
        annotation: getAnnotation(8),
      },
    ].map((cell) => ({ ...cell, disabled }))

    const secondPersonFeminine = [
      {
        content: $tasreef?.['2nd'].feminine.أَنْتِ || '',
        annotation: getAnnotation(9),
      },
      {
        content: $tasreef?.['2nd'].feminine.أَنْتُمَا || '',
        annotation: getAnnotation(10),
      },
      {
        content: $tasreef?.['2nd'].feminine.أَنْتُنَّ || '',
        annotation: getAnnotation(11),
      },
    ].map((cell) => ({ ...cell, disabled }))

    const firstPerson = [
      {
        content: $tasreef && '1st' in $tasreef ? $tasreef['1st'].أَنَا : '',
        annotation: getAnnotation(12),
      },
      {
        content: $tasreef && '1st' in $tasreef ? $tasreef['1st'].نَحْنُ : '',
        annotation: getAnnotation(13),
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
  }, [tasreef, rootLetters, defaultRootLetters, getAnnotation, mode, disabled])

  return (
    <Table
      header={
        <div className="flex flex-1 flex-col px-2 py-1">
          <p className="flex items-center justify-center">{name}</p>
          {audio && <AudioPlayer src={audio} />}
          {!audio && (
            <p className="h-4 select-none text-center text-sm text-zinc-300 dark:text-neutral-400">
              No recording yet
            </p>
          )}
        </div>
      }
      data={tableData}
      column={mode === 'list'}
    />
  )
}

export default Tasreef
