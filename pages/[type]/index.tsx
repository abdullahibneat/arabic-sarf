import Tasreef from '@/components/Tasreef'
import { useMemo } from 'react'
import useSarfKabeers from '@/hooks/useSarfKabeers'

const Type = () => {
  const { simpleSarfKabeers } = useSarfKabeers()

  const sections = useMemo(() => {
    const madi = []
    const mudari = []

    for (const sarfKabeer of simpleSarfKabeers) {
      madi.push(sarfKabeer.ماضي)
      mudari.push(sarfKabeer.مضارع)
    }

    return [
      { name: 'ماضي', tasreefs: madi },
      { name: 'مضارع', tasreefs: mudari },
    ]
  }, [simpleSarfKabeers])

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

export default Type
