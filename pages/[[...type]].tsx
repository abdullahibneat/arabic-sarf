import { RootLetter, VerbTasreef } from '@/data/types'
import useMushtaqqs, { Mushtaqq } from '@/hooks/useMushtaqqs'
import useSarfSagheers, {
  SarfSagheer as SarfSagheerType,
} from '@/hooks/useSarfSagheers'

import IsmFail from '@/components/IsmFail'
import SarfSagheer from '@/components/SarfSagheer'
import Tasreef from '@/components/Tasreef'
import { useMemo } from 'react'
import useSarf from '@/hooks/useSarf'
import useSarfKabeers from '@/hooks/useSarfKabeers'

const Home = () => {
  const simpleSarfKabeers = useSarfKabeers()
  const sarfSagheers = useSarfSagheers()
  const mushtaqqs = useMushtaqqs()

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
            mushtaqq: Mushtaqq | null
          }>
          mudari: Array<{
            chapter: string
            tasreef: VerbTasreef | null
            sarfSagheer: SarfSagheerType | null
            rootLetters: RootLetter[]
            mushtaqq: Mushtaqq | null
          }>
        }
        mazeedFihi: {
          madi: Array<{
            chapter: string
            tasreef: VerbTasreef | null
            sarfSagheer: SarfSagheerType | null
            rootLetters: RootLetter[]
            mushtaqq: Mushtaqq | null
          }>
          mudari: Array<{
            chapter: string
            tasreef: VerbTasreef | null
            sarfSagheer: SarfSagheerType | null
            rootLetters: RootLetter[]
            mushtaqq: Mushtaqq | null
          }>
        }
      }
    > = new Map()

    const $sarfSagheers = sarfSagheers.values()
    const $mushtaqqs = mushtaqqs.values()

    for (const sarfKabeer of simpleSarfKabeers) {
      const sarfSagheer = $sarfSagheers.next().value
      const mushtaqq = $mushtaqqs.next().value

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
          mushtaqq,
        })
        section.mujarrad.mudari.push({
          chapter: sarfKabeer.باب,
          tasreef: sarfKabeer.مضارع,
          sarfSagheer,
          rootLetters: sarfKabeer.rootLetters,
          mushtaqq,
        })
      } else {
        section.mazeedFihi.madi.push({
          chapter: sarfKabeer.باب,
          tasreef: sarfKabeer.ماضي,
          sarfSagheer,
          rootLetters: sarfKabeer.rootLetters,
          mushtaqq,
        })
        section.mazeedFihi.mudari.push({
          chapter: sarfKabeer.باب,
          tasreef: sarfKabeer.مضارع,
          sarfSagheer,
          rootLetters: sarfKabeer.rootLetters,
          mushtaqq,
        })
      }

      $sections.set(sarfKabeer.type, section)
    }

    return $sections
  }, [simpleSarfKabeers])

  return (
    <div className="flex flex-col gap-8 p-4">
      {sections.size === 0 && <div>Not found</div>}

      {Array.from(sections.entries()).map(
        ([type, { mujarrad, mazeedFihi }]) => (
          <div key={type} className="flex flex-col gap-1">
            <h2 className="text-center">{type} - مجرّد</h2>

            {sarfType === 'صرف كبير' && (
              <div className="flex w-full">
                <div className="mx-auto flex gap-1 overflow-x-auto overflow-y-hidden">
                  {mujarrad.madi.map(({ chapter, tasreef, rootLetters }) => (
                    <Tasreef
                      key={`${type}-${chapter}`}
                      name={chapter}
                      tasreef={tasreef}
                      defaultRootLetters={rootLetters[0]?.arabic}
                    />
                  ))}
                </div>
              </div>
            )}

            {sarfType === 'صرف كبير' && (
              <div className="flex w-full">
                <div className="mx-auto flex gap-1 overflow-x-auto overflow-y-hidden">
                  {mujarrad.mudari.map(({ chapter, tasreef, rootLetters }) => (
                    <Tasreef
                      key={`${type}-${chapter}`}
                      name={chapter}
                      tasreef={tasreef}
                      defaultRootLetters={rootLetters[0]?.arabic}
                    />
                  ))}
                </div>
              </div>
            )}

            {sarfType === 'صرف صغير' && (
              <div className="flex w-full">
                <div className="mx-auto flex gap-1 overflow-x-auto overflow-y-hidden">
                  {mujarrad.madi.map(
                    ({ chapter, sarfSagheer, rootLetters }) => (
                      <SarfSagheer
                        key={`${type}-${chapter}`}
                        sarfSagheer={sarfSagheer}
                        defaultRootLetters={rootLetters[0]?.arabic}
                      />
                    ),
                  )}
                </div>
              </div>
            )}

            {sarfType === 'مشتق' && (
              <div className="flex w-full">
                <div className="mx-auto flex gap-1 overflow-x-auto overflow-y-hidden">
                  {mujarrad.madi.map(({ chapter, mushtaqq, rootLetters }) => (
                    <IsmFail
                      key={`${type}-${chapter}`}
                      ismFail={mushtaqq?.فاعل}
                      defaultRootLetters={rootLetters[0]?.arabic}
                    />
                  ))}
                </div>
              </div>
            )}

            <h2 className="text-center">{type} - مزيد فيه</h2>

            {sarfType === 'صرف كبير' && (
              <div className="flex w-full">
                <div className="mx-auto flex gap-1 overflow-x-auto overflow-y-hidden">
                  {mazeedFihi.madi.map(({ chapter, tasreef, rootLetters }) => (
                    <Tasreef
                      key={`${type}-${chapter}`}
                      name={chapter}
                      tasreef={tasreef}
                      defaultRootLetters={rootLetters[0]?.arabic}
                    />
                  ))}
                </div>
              </div>
            )}

            {sarfType === 'صرف كبير' && (
              <div className="flex w-full">
                <div className="mx-auto flex gap-1 overflow-x-auto overflow-y-hidden">
                  {mazeedFihi.mudari.map(
                    ({ chapter, tasreef, rootLetters }) => (
                      <Tasreef
                        key={`${type}-${chapter}`}
                        name={chapter}
                        tasreef={tasreef}
                        defaultRootLetters={rootLetters[0]?.arabic}
                      />
                    ),
                  )}
                </div>
              </div>
            )}

            {sarfType === 'صرف صغير' && (
              <div className="flex w-full">
                <div className="mx-auto flex gap-1 overflow-x-auto overflow-y-hidden">
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
              </div>
            )}

            {sarfType === 'مشتق' && (
              <div className="flex w-full">
                <div className="mx-auto flex gap-1 overflow-x-auto overflow-y-hidden">
                  {mazeedFihi.madi.map(({ chapter, mushtaqq, rootLetters }) => (
                    <IsmFail
                      key={`${type}-${chapter}`}
                      ismFail={mushtaqq?.فاعل}
                      defaultRootLetters={rootLetters[0]?.arabic}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ),
      )}
    </div>
  )
}

export default Home
