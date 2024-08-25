import Tasreef from '@/components/Tasreef'
import { VerbTasreef } from '@/data/types'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import verbTypes from '@/data'

const Type = () => {
  const { type } = useRouter().query

  const tasreefs = useMemo(() => {
    if (!type) return null

    const $tasreefs: Array<{ name: string; tasreef: VerbTasreef }> = []

    const verbType = verbTypes.get(String(type))

    if (!verbType) return null

    for (const chapterName of Array.from(verbType.keys())) {
      const chapter = verbType.get(chapterName)
      if (!chapter) continue
      $tasreefs.push({
        name: chapterName,
        tasreef: chapter.فعل.ماضي.معروف.مرفوع,
      })
    }

    return $tasreefs
  }, [type])

  if (!tasreefs) return <div className="p-4">not found</div>

  return (
    <div className="p-4">
      <div>
        <h2>{type}</h2>
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

export default Type
