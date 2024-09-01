import { RootLetter, VerbTasreef } from '@/data/types'
import useSarfSagheers, {
  SarfSagheer as SarfSagheerType,
} from '@/hooks/useSarfSagheers'

import SarfSagheer from '@/components/SarfSagheer'
import Tasreef from '@/components/Tasreef'
import { useMemo } from 'react'
import useSarf from '@/hooks/useSarf'
import useSarfKabeers from '@/hooks/useSarfKabeers'

const Home = () => {
  const simpleSarfKabeers = useSarfKabeers()
  const sarfSagheers = useSarfSagheers()
  const { sarfType } = useSarf()

  const sections = useMemo(() => {
    const $sections: Map<
      string,
      {
        mujarrad: {
          madi: Array<{
            chapter: string
            tasreef: VerbTasreef | null
            sarfSagheer: SarfSagheerType | null
            rootLetters: RootLetter[]
          }>
          mudari: Array<{
            chapter: string
            tasreef: VerbTasreef | null
            sarfSagheer: SarfSagheerType | null
            rootLetters: RootLetter[]
          }>
        }
        mazeedFihi: {
          madi: Array<{
            chapter: string
            tasreef: VerbTasreef | null
            sarfSagheer: SarfSagheerType | null
            rootLetters: RootLetter[]
          }>
          mudari: Array<{
            chapter: string
            tasreef: VerbTasreef | null
            sarfSagheer: SarfSagheerType | null
            rootLetters: RootLetter[]
          }>
        }
      }
    > = new Map()

    const $sarfSagheers = sarfSagheers.values()

    for (const sarfKabeer of simpleSarfKabeers) {
      const sarfSagheer = $sarfSagheers.next().value

      const section = $sections.get(sarfKabeer.type) || {
        mujarrad: {
          madi: [],
          mudari: [],
        },
        mazeedFihi: {
          madi: [],
          mudari: [],
        },
      }

      if (sarfKabeer.mujarrad) {
        section.mujarrad.madi.push({
          chapter: sarfKabeer.باب,
          tasreef: sarfKabeer.ماضي,
          sarfSagheer,
          rootLetters: sarfKabeer.rootLetters,
        })
        section.mujarrad.mudari.push({
          chapter: sarfKabeer.باب,
          tasreef: sarfKabeer.مضارع,
          sarfSagheer,
          rootLetters: sarfKabeer.rootLetters,
        })
      } else {
        section.mazeedFihi.madi.push({
          chapter: sarfKabeer.باب,
          tasreef: sarfKabeer.ماضي,
          sarfSagheer,
          rootLetters: sarfKabeer.rootLetters,
        })
        section.mazeedFihi.mudari.push({
          chapter: sarfKabeer.باب,
          tasreef: sarfKabeer.مضارع,
          sarfSagheer,
          rootLetters: sarfKabeer.rootLetters,
        })
      }

      $sections.set(sarfKabeer.type, section)
    }

    return $sections
  }, [simpleSarfKabeers])

  return (
    <div className="flex flex-col gap-4 p-4">
      {sections.size === 0 && <div>Not found</div>}

      {Array.from(sections.entries()).map(
        ([type, { mujarrad, mazeedFihi }]) => (
          <div key={type} className="flex flex-col gap-1">
            <h2>{type} - ماضي</h2>

            {sarfType === 'صرف كبير' && (
              <div className="flex gap-1">
                {mujarrad.madi.map(({ chapter, tasreef, rootLetters }) => (
                  <Tasreef
                    key={`${type}-${chapter}`}
                    name={chapter}
                    tasreef={tasreef}
                    defaultRootLetters={rootLetters[0]?.arabic}
                    mode="list"
                  />
                ))}
                {mazeedFihi.madi.map(({ chapter, tasreef, rootLetters }) => (
                  <Tasreef
                    key={`${type}-${chapter}`}
                    name={chapter}
                    tasreef={tasreef}
                    defaultRootLetters={rootLetters[0]?.arabic}
                    mode="list"
                  />
                ))}
              </div>
            )}

            {sarfType === 'صرف صغير' && (
              <div className="flex gap-1">
                {mujarrad.madi.map(({ chapter, sarfSagheer, rootLetters }) => (
                  <SarfSagheer
                    key={`${type}-${chapter}`}
                    sarfSagheer={sarfSagheer}
                    defaultRootLetters={rootLetters[0]?.arabic}
                  />
                ))}
                {mazeedFihi.madi.map(
                  ({ chapter, sarfSagheer, rootLetters }) => (
                    <SarfSagheer
                      key={`${type}-${chapter}`}
                      sarfSagheer={sarfSagheer}
                      defaultRootLetters={rootLetters[0]?.arabic}
                    />
                  ),
                )}
              </div>
            )}

            <h2>{type} - مضارع</h2>

            {sarfType === 'صرف كبير' && (
              <div className="flex gap-1">
                {mujarrad.mudari.map(({ chapter, tasreef, rootLetters }) => (
                  <Tasreef
                    key={`${type}-${chapter}`}
                    name={chapter}
                    tasreef={tasreef}
                    defaultRootLetters={rootLetters[0]?.arabic}
                    mode="list"
                  />
                ))}
                {mazeedFihi.mudari.map(({ chapter, tasreef, rootLetters }) => (
                  <Tasreef
                    key={`${type}-${chapter}`}
                    name={chapter}
                    tasreef={tasreef}
                    defaultRootLetters={rootLetters[0]?.arabic}
                    mode="list"
                  />
                ))}
              </div>
            )}

            {sarfType === 'صرف صغير' && (
              <div className="flex gap-1">
                {mujarrad.mudari.map(
                  ({ chapter, sarfSagheer, rootLetters }) => (
                    <SarfSagheer
                      key={`${type}-${chapter}`}
                      sarfSagheer={sarfSagheer}
                      defaultRootLetters={rootLetters[0]?.arabic}
                    />
                  ),
                )}
                {mazeedFihi.mudari.map(
                  ({ chapter, sarfSagheer, rootLetters }) => (
                    <SarfSagheer
                      key={`${type}-${chapter}`}
                      sarfSagheer={sarfSagheer}
                      defaultRootLetters={rootLetters[0]?.arabic}
                    />
                  ),
                )}
              </div>
            )}
          </div>
        ),
      )}
    </div>
  )
}

export default Home
