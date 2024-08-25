import Tasreef from '@/components/Tasreef'
import { VerbTasreef } from '@/data/types'
import { useMemo } from 'react'
import verbTypes from '@/data'

const Home = () => {
  const sections = useMemo(() => {
    const $sections: Array<{
      name: string
      tasreefs: Array<{ name: string; tasreef: VerbTasreef }>
    }> = []

    for (const verbTypeName of Array.from(verbTypes.keys())) {
      const verbType = verbTypes.get(verbTypeName)

      if (!verbType) continue

      const section: (typeof $sections)[number] = {
        name: verbTypeName,
        tasreefs: [],
      }

      for (const chapterName of Array.from(verbType.keys())) {
        const chapter = verbType.get(chapterName)
        if (!chapter) continue
        section.tasreefs.push({
          name: chapterName,
          tasreef: chapter.فعل.ماضي.معروف.مرفوع,
        })
      }

      $sections.push(section)
    }

    return $sections
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h2>{section.name}</h2>
          <div className="flex gap-1">
            {section.tasreefs.map(({ name, tasreef }, tasreefIndex) => (
              <Tasreef
                key={tasreefIndex}
                name={name}
                tasreef={tasreef}
                mode="list"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
