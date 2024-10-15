import IsmFail from '@/components/IsmFail'
import SarfSagheer from '@/components/SarfSagheer'
import Tasreef from '@/components/Tasreef'
import { useMemo } from 'react'
import useSarf from '@/hooks/useSarf'
import useVerbTypes from '@/hooks/useVerbTypes'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import verbTypes, { audios } from '@/data'
import IsmMafool from '@/components/IsmMafool'
import Masdar from '@/components/Masdar'

export const getStaticPaths: GetStaticPaths = async () => {
  const allVerbTypes = Array.from(verbTypes.keys())
  const paths: GetStaticPathsResult['paths'] = []
  for (const type of allVerbTypes) {
    const verbType = verbTypes.get(type)
    if (!verbType) continue
    const chapters = Array.from(verbType.keys())
    for (const chapter of chapters) {
      const exists = verbType.get(chapter)
      if (!exists) continue
      paths.push({
        params: { type, chapter },
      })
    }
  }
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = (() => ({ props: {} })) satisfies GetStaticProps

const Chapter = () => {
  const { sarfType, verbType, verbChapter, passive, verbCase } = useSarf()

  const verbTypes = useVerbTypes()

  const chapter = useMemo(() => {
    if (!verbType) return null
    const chapters = verbTypes[verbType] || []
    return chapters.find(
      (chapter) => chapter.key === `${verbType}/${verbChapter}`,
    )
  }, [verbTypes, verbType, verbChapter])

  const madiDisabled = useMemo(
    () => (verbCase ? verbCase !== 'مرفوع' : false),
    [verbCase],
  )

  const amrDisabled = useMemo(() => {
    if (passive) return true
    if (verbCase) return verbCase !== 'مجزوم'
    return false
  }, [passive, verbCase])

  return (
    <div className="p-4">
      <div className="flex flex-col gap-1">
        {!chapter?.sarfKabeer && <div>Not found</div>}

        {chapter?.sarfKabeer && (
          <>
            <h2 className="text-center">
              {chapter.form} - {chapter.name}
            </h2>

            {sarfType === 'صرف كبير' && (
              <div className="mx-auto flex gap-1">
                <Tasreef
                  name="ماضي"
                  audio={audios.get(chapter.key)?.ماضي}
                  tasreef={
                    chapter.sarfKabeer?.[passive ? 'مجهول' : 'معروف']?.ماضي
                  }
                  defaultRootLetters={chapter.rootLetters[0]?.arabic}
                  disabled={madiDisabled}
                />
                <Tasreef
                  name="مضارع"
                  audio={audios.get(chapter.key)?.مضارع}
                  tasreef={
                    chapter.sarfKabeer?.[passive ? 'مجهول' : 'معروف']?.مضارع[
                      verbCase || 'مرفوع'
                    ]
                  }
                  defaultRootLetters={chapter.rootLetters[0]?.arabic}
                />
                <Tasreef
                  name="أمر"
                  tasreef={chapter.sarfKabeer?.أمر}
                  defaultRootLetters={chapter.rootLetters[0]?.arabic}
                  disabled={amrDisabled}
                />
              </div>
            )}

            {sarfType === 'صرف صغير' && (
              <div className="mx-auto flex gap-1">
                <SarfSagheer
                  sarfSagheer={chapter.sarfSagheer}
                  defaultRootLetters={chapter.rootLetters[0]?.arabic}
                />
              </div>
            )}

            {sarfType === 'مشتق' && (
              <div className="mx-auto flex gap-1">
                <Masdar
                  masdars={chapter.mushtaqq.مصدر}
                  defaultRootLetters={chapter.rootLetters[0]?.arabic}
                />
                <IsmFail
                  ismFail={chapter.mushtaqq.فاعل}
                  defaultRootLetters={chapter.rootLetters[0]?.arabic}
                />
                <IsmMafool
                  ismMafool={chapter.mushtaqq.مفعول}
                  defaultRootLetters={chapter.rootLetters[0]?.arabic}
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
