import IsmFail from '@/components/IsmFail'
import SarfSagheer from '@/components/SarfSagheer'
import Tasreef from '@/components/Tasreef'
import { mazeedFihiNumberingAtom } from '@/atoms'
import toRoman from '@/helpers/toRoman'
import { useAtom } from 'jotai'
import useMushtaqqs from '@/hooks/useMushtaqqs'
import { useRouter } from 'next/router'
import useSarf from '@/hooks/useSarf'
import useSarfKabeers from '@/hooks/useSarfKabeers'
import useSarfSagheers from '@/hooks/useSarfSagheers'

const Chapter = () => {
  const { type, chapter } = useRouter().query

  const simpleSarfKabeers = useSarfKabeers()
  const sarfSagheers = useSarfSagheers()
  const mushtaqqs = useMushtaqqs()

  const { sarfType } = useSarf()

  const [mazeedFihiNumbering] = useAtom(mazeedFihiNumberingAtom)

  const tasreef = simpleSarfKabeers.length === 0 ? null : simpleSarfKabeers[0]
  const sarfSagheer = sarfSagheers.length === 0 ? null : sarfSagheers[0]
  const mushtaqq = mushtaqqs.length === 0 ? null : mushtaqqs[0]

  let chapterName = chapter

  if (Number(chapter) && mazeedFihiNumbering === 'roman') {
    chapterName = toRoman(Number(chapter))
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-1">
        {!tasreef && <div>Not found</div>}

        {tasreef && (
          <>
            <h2 className="text-center">
              {type} - {chapterName}
            </h2>

            {sarfType === 'صرف كبير' && (
              <div className="mx-auto flex gap-1">
                <Tasreef
                  name="ماضي"
                  tasreef={tasreef?.ماضي}
                  defaultRootLetters={tasreef.rootLetters[0].arabic}
                />
                <Tasreef
                  name="مضارع"
                  tasreef={tasreef?.مضارع}
                  defaultRootLetters={tasreef.rootLetters[0].arabic}
                />
                <Tasreef
                  name="أمر"
                  tasreef={tasreef?.أمر}
                  defaultRootLetters={tasreef.rootLetters[0].arabic}
                />
              </div>
            )}

            {sarfType === 'صرف صغير' && (
              <div className="mx-auto flex gap-1">
                <SarfSagheer
                  sarfSagheer={sarfSagheer}
                  defaultRootLetters={tasreef.rootLetters[0].arabic}
                />
              </div>
            )}

            {sarfType === 'مشتق' && (
              <div className="mx-auto flex gap-1">
                <IsmFail
                  ismFail={mushtaqq?.فاعل}
                  defaultRootLetters={tasreef.rootLetters[0].arabic}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Chapter
