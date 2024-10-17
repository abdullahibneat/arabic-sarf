import { Chapter } from '@/helpers/getChapters'
import IsmFail from '@/components/IsmFail'
import SarfSagheer from '@/components/SarfSagheer'
import Tasreef from '@/components/Tasreef'
import React, { useMemo } from 'react'
import useSarf from '@/hooks/useSarf'
import useVerbTypes from '@/hooks/useVerbTypes'
import verbTypes, { audios } from '@/data'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import IsmMafool from '@/components/IsmMafool'
import Masdar from '@/components/Masdar'
import Table from '@/components/Table'

export const getStaticPaths: GetStaticPaths = () => {
  const allVerbTypes = Array.from(verbTypes.keys())
  const paths: GetStaticPathsResult['paths'] = [{ params: { type: undefined } }]
  for (const verbType of allVerbTypes) {
    paths.push({ params: { type: [verbType] } })
  }
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = (() => ({ props: {} })) satisfies GetStaticProps

const Home = () => {
  const { sarfType, verbType } = useSarf()

  const verbTypes = useVerbTypes()

  const sections = useMemo(() => {
    const $sections: Array<{
      key: string
      name: string
      chapters: Chapter[]
    }> = []

    for (const [type, chapters] of Object.entries(verbTypes)) {
      // If viewing a single verb type (e.g. صحيح), only show that type
      if (verbType && type !== verbType) continue

      for (const chapter of chapters) {
        const sectionKey = `${type}-${chapter.mazeedFihi ? 'mazeed-fihi' : 'mujarrad'}`

        const section = $sections.find((section) => section.key === sectionKey)

        if (section) {
          section.chapters.push(chapter)
        } else {
          $sections.push({
            key: sectionKey,
            name: `${type} - ${chapter.mazeedFihi ? 'مزيد فيه' : 'مجرّد'}`,
            chapters: [chapter],
          })
        }
      }
    }

    return $sections
  }, [verbTypes, verbType])

  return (
    <div className="flex flex-col gap-8 p-4 pb-20">
      {sections.length === 0 && <div>Not found</div>}

      {sections.map((section) => (
        <div key={section.key} className="flex flex-col gap-1">
          <h2 className="text-center">{section.name}</h2>

          {sarfType === 'صرف كبير' && (
            <VerbOverview chapters={section.chapters} />
          )}

          {sarfType === 'صرف صغير' && (
            <div className="flex w-full">
              <div className="mx-auto flex gap-1 overflow-x-auto overflow-y-hidden">
                {section.chapters.map((chapter) => (
                  <SarfSagheer
                    key={chapter.key}
                    sarfSagheer={chapter.sarfSagheer}
                    defaultRootLetters={chapter.rootLetters?.[0]?.arabic}
                  />
                ))}
              </div>
            </div>
          )}

          {sarfType === 'مشتق' && (
            <MushtaqqOverview chapters={section.chapters} />
          )}
        </div>
      ))}
    </div>
  )
}

export default Home

const VerbOverview = ({ chapters }: { chapters: Chapter[] }) => {
  const { passive, verbCase } = useSarf()

  return (
    <div className="flex w-full flex-col gap-1 overflow-x-auto overflow-y-hidden">
      <div className="mx-auto flex gap-1">
        {chapters.map((chapter) => (
          <Tasreef
            key={chapter.key}
            name={chapter.form}
            audio={audios.get(chapter.key)?.ماضي}
            tasreef={chapter.sarfKabeer?.[passive ? 'مجهول' : 'معروف']?.ماضي}
            defaultRootLetters={chapter.rootLetters?.[0]?.arabic}
            disabled={verbCase ? verbCase !== 'مرفوع' : false}
          />
        ))}
      </div>

      <div className="mx-auto flex gap-1">
        {chapters.map((chapter) => (
          <Tasreef
            key={chapter.key}
            name={chapter.form}
            audio={audios.get(chapter.key)?.مضارع}
            tasreef={
              chapter.sarfKabeer?.[passive ? 'مجهول' : 'معروف']?.مضارع[
                verbCase || 'مرفوع'
              ]
            }
            defaultRootLetters={chapter.rootLetters?.[0]?.arabic}
          />
        ))}
      </div>
    </div>
  )
}

const MushtaqqOverview = ({ chapters }: { chapters: Chapter[] }) => (
  <div className="flex w-full flex-col gap-1 overflow-x-auto overflow-y-hidden">
    <div className="mx-auto flex gap-1">
      {chapters.map((chapter) => (
        <Table column key={chapter.key} header={chapter.form} data={[]} />
      ))}
    </div>

    <div className="mx-auto flex gap-1">
      {chapters.map((chapter) => (
        <Masdar
          key={chapter.key}
          masdars={chapter.mushtaqq.مصدر}
          defaultRootLetters={chapter.rootLetters?.[0]?.arabic}
        />
      ))}
    </div>

    <div className="mx-auto flex gap-1">
      {chapters.map((chapter) => (
        <IsmFail
          key={chapter.key}
          ismFail={chapter.mushtaqq.فاعل}
          defaultRootLetters={chapter.rootLetters?.[0]?.arabic}
        />
      ))}
    </div>

    <div className="mx-auto flex gap-1">
      {chapters.map((chapter) => (
        <IsmMafool
          key={chapter.key}
          ismMafool={chapter.mushtaqq.مفعول}
          defaultRootLetters={chapter.rootLetters?.[0]?.arabic}
        />
      ))}
    </div>
  </div>
)
