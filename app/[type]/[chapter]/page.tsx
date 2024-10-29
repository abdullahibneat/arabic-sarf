'use client'

import IsmFail from '@/components/IsmFail'
import IsmMafool from '@/components/IsmMafool'
import Masdar from '@/components/Masdar'
import PageTitle from '@/components/PageTitle'
import SarfSagheer from '@/components/SarfSagheer'
import Tasreef from '@/components/Tasreef'
import { audios } from '@/data'
import { useMemo } from 'react'
import useSarf from '@/hooks/useSarf'
import useVerbTypes from '@/hooks/useVerbTypes'

const ChapterPage = () => {
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
    <div className="flex flex-col px-4 pb-16">
      {!chapter && <div>Not found</div>}

      {chapter && (
        <div className="flex flex-col gap-1">
          <PageTitle>{`${chapter.form} - ${chapter.name}`}</PageTitle>

          {sarfType === 'صرف كبير' && (
            <div className="flex w-full flex-col gap-1 overflow-x-auto overflow-y-hidden">
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
        </div>
      )}
    </div>
  )
}

export default ChapterPage
