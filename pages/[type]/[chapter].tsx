import { VerbSighaSecondPerson, VerbTasreef } from '@/data/types'

import Tasreef from '@/components/Tasreef'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import verbTypes from '@/data'

const Chapter = () => {
  const { type, chapter } = useRouter().query

  const tasreefs = useMemo(() => {
    if (!type) return null

    const $tasreefs: Array<{
      name: string
      tasreef:
        | VerbTasreef
        | {
            '2nd': VerbSighaSecondPerson
          }
    }> = []

    const verbType = verbTypes.get(String(type))

    if (!verbType) return null

    const verbChapter = verbType.get(String(chapter))

    if (!verbChapter) return null

    $tasreefs.push({
      name: 'ماضي',
      tasreef: verbChapter.فعل.ماضي.معروف.مرفوع,
    })

    $tasreefs.push({
      name: 'مضارع',
      tasreef: verbChapter.فعل.مضارع.معروف.مرفوع,
    })

    const amr = verbChapter.فعل.أمر.معروف.مجزوم

    if (amr) {
      $tasreefs.push({
        name: 'أمر',
        tasreef: amr,
      })
    }

    return $tasreefs
  }, [type, chapter])

  if (!tasreefs) return <div className="p-4">not found</div>

  return (
    <div className="p-4">
      <div>
        <h2>
          {type} - {chapter}
        </h2>
        <div className="flex gap-1">
          {tasreefs.map(({ name, tasreef }, tasreefIndex) => (
            <Tasreef
              key={tasreefIndex}
              name={name}
              tasreef={tasreef}
              mode="list"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chapter
