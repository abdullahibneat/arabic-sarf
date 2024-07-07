import '../styles/OverviewScreen.scss'

import SarfSagheer, { SarfSagheerProps } from '../components/SarfSagheer'
import Tasreef, { TasreefProps } from '../components/Tasreef'
import { useCallback, useEffect, useMemo } from 'preact/hooks'
import { useParams, useSearchParams } from 'react-router-dom'

import Faail from '../components/Faail'
import Flex from '../components/Flex'
import Mafool from '../components/Mafool'
import Masdar from '../components/Masdar'
import TasreefToolbar from '../components/TasreefToolbar'
import Text from '../components/Text'
import { VerbChapter } from '../../data/types'
import getMazeedFihiChapterHeading from '../helpers/getMazeedFihiChapterHeading'
import getMujarradChapterHeading from '../helpers/getMujarradChapterHeading'
import replaceRoots from '../helpers/replaceRoots'
import useAppState from '../hooks/useAppState'
import useToolbar from '../hooks/useToolbar'
import verbTypes from '../../data'

const OverviewScreen = () => {
  const params = useParams()
  const toolbar = useToolbar()

  const [searchParams] = useSearchParams()

  const { settings } = useAppState()

  const voice = searchParams.get('voice') || 'معروف'
  const verbCase = searchParams.get('verbCase') || 'مرفوع'

  useEffect(() => {
    if (voice !== 'معروف' && voice !== 'مجهول') return
    toolbar.show(<TasreefToolbar />)
    return () => toolbar.close()
  }, [voice])

  const pastConjugation = useMemo(() => {
    if (verbCase === 'مرفوع') return 'ماضي'
    return verbCase
  }, [verbCase])

  const presentConjugation = useMemo(() => {
    if (verbCase === 'منصوب') return 'نصب'
    if (verbCase === 'مجزوم') return 'جزم'
    return 'مضارع'
  }, [verbCase])

  const particle = useMemo(() => {
    if (settings.showNasbJazmParticle) {
      if (verbCase === 'منصوب') return 'لن'
      if (verbCase === 'مجزوم') return 'لم'
    }
  }, [settings.showNasbJazmParticle, verbCase])

  const generateSarfSagheerOverviewForVerbType = useCallback(
    (type: string, verbMap: Map<string, VerbChapter | null | undefined>) => {
      const $sections: Array<{
        title: string
        sarfSagheers: SarfSagheerProps[]
      }> = [
        {
          title: `${type} / ${
            settings.mujarradChapterHeadings === 'arabic' ? `مجرّد` : ''
          }`,
          sarfSagheers: [],
        },
        {
          title: `${type} / ${
            settings.mujarradChapterHeadings === 'arabic' ? `مزيد فيه` : ''
          }`,
          sarfSagheers: [],
        },
      ]

      const mujarrad = $sections[0]
      const mazeedFihi = $sections[1]

      for (const chapter of verbMap.values()) {
        if (!chapter) continue

        const archetype = replaceRoots(chapter)
        const collection = archetype.form === 1 ? mujarrad : mazeedFihi
        collection.sarfSagheers.push({ chapter: archetype })
      }

      return $sections
    },
    [settings.mujarradChapterHeadings],
  )

  const generateTasreefOverviewForVerbType = useCallback(
    (type: string, verbMap: Map<string, VerbChapter | null | undefined>) => {
      const $sections: Array<{
        title: string
        tasreefs: TasreefProps[]
        particle?: string
      }> = [
        {
          title: `${type} / ${
            settings.mujarradChapterHeadings === 'arabic' ? `مجرّد / ` : ''
          }ماضي`,
          tasreefs: [],
        },
        {
          title: `${type} / ${
            settings.mujarradChapterHeadings === 'arabic' ? `مجرّد / ` : ''
          }مضارع`,
          tasreefs: [],
          particle,
        },
        {
          title: `${type} / ${
            settings.mujarradChapterHeadings === 'arabic' ? `مزيد فيه / ` : ''
          }ماضي`,
          tasreefs: [],
        },
        {
          title: `${type} / ${
            settings.mujarradChapterHeadings === 'arabic' ? `مزيد فيه / ` : ''
          }مضارع`,
          tasreefs: [],
          particle,
        },
      ]

      const mujarradMadi = $sections[0]
      const mujarradMudari = $sections[1]
      const mazeedFihiMadi = $sections[2]
      const mazeedFihiMudari = $sections[3]

      for (const chapter of verbMap.values()) {
        if (!chapter) continue

        const madiCollection =
          chapter.form === 1 ? mujarradMadi : mazeedFihiMadi
        const mudariCollection =
          chapter.form === 1 ? mujarradMudari : mazeedFihiMudari

        madiCollection.tasreefs.push({
          title:
            chapter.form === 1
              ? getMujarradChapterHeading(chapter.chapter)
              : getMazeedFihiChapterHeading(chapter.form),
          rootLetters: chapter.root_letters[0].arabic,
          tense: 'ماضي',
          baseChapter: chapter,
          case: verbCase,
          voice,
        })

        mudariCollection.tasreefs.push({
          title:
            chapter.form === 1
              ? getMujarradChapterHeading(chapter.chapter)
              : getMazeedFihiChapterHeading(chapter.form),
          rootLetters: chapter.root_letters[0].arabic,
          tense: 'مضارع',
          baseChapter: chapter,
          case: verbCase,
          voice,
        })
      }

      return $sections
    },
    [
      settings.mujarradChapterHeadings,
      settings.mazeedFihiChapterHeadings,
      voice,
      pastConjugation,
      presentConjugation,
      particle,
    ],
  )

  const generateMushtaqqOverviewForVerbType = useCallback(
    (type: string, verbMap: Map<string, VerbChapter | null | undefined>) => {
      const $sections: Array<{
        title: string
        chapters: VerbChapter[]
      }> = [
        {
          title: `${type} / ${
            settings.mujarradChapterHeadings === 'arabic' ? `مجرّد` : ''
          }`,
          chapters: [],
        },
        {
          title: `${type} / ${
            settings.mujarradChapterHeadings === 'arabic' ? `مزيد فيه` : ''
          }`,
          chapters: [],
        },
      ]

      const mujarrad = $sections[0]
      const mazeedFihi = $sections[1]

      for (const chapter of verbMap.values()) {
        if (!chapter) continue

        const archetype = replaceRoots(chapter)
        const collection = archetype.form === 1 ? mujarrad : mazeedFihi
        collection.chapters.push(archetype)
      }

      return $sections
    },
    [settings.mujarradChapterHeadings],
  )

  const verbs = useMemo(() => {
    const $verbs: Record<
      string,
      Map<string, VerbChapter | null | undefined>[]
    > = {}

    if (params.type) {
      const verbType = verbTypes.get(params.type)

      if (verbType) {
        $verbs[params.type] = [verbType]
      }
    } else {
      for (const [verbTypeKey, verbType] of verbTypes.entries()) {
        if (settings.hiddenVerbTypes.includes(verbTypeKey)) {
          continue
        }

        $verbs[verbTypeKey] = [verbType]
      }
    }

    return $verbs
  }, [params.type, settings.hiddenVerbTypes])

  const tasreefSections = useMemo(() => {
    return Object.entries(verbs).flatMap(([type, verbMap]) =>
      verbMap.flatMap((verbType) =>
        generateTasreefOverviewForVerbType(type, verbType),
      ),
    )
  }, [verbs, generateTasreefOverviewForVerbType])

  const sarfSagheerSections = useMemo(() => {
    return Object.entries(verbs).flatMap(([type, verbMap]) =>
      verbMap.flatMap((verbType) =>
        generateSarfSagheerOverviewForVerbType(type, verbType),
      ),
    )
  }, [verbs, generateTasreefOverviewForVerbType])

  const mushtaqqSections = useMemo(() => {
    return Object.entries(verbs).flatMap(([type, verbMap]) =>
      verbMap.flatMap((verbType) =>
        generateMushtaqqOverviewForVerbType(type, verbType),
      ),
    )
  }, [verbs, generateTasreefOverviewForVerbType])

  const sections = useMemo(() => {
    if (voice === 'صرف صغير') return sarfSagheerSections
    if (voice === 'مشتق') return mushtaqqSections
    return tasreefSections
  }, [voice, sarfSagheerSections, mushtaqqSections, tasreefSections])

  return (
    <Flex column>
      {sections.map((section, i) => (
        <div key={`section-${i}`} class="section">
          <Text type="bold" style={{ textAlign: 'center' }}>
            {section.title}
          </Text>

          <Flex justifyContent="center">
            <Flex
              gap={32}
              padding="0 1rem 1rem"
              overflowX="auto"
              direction="rtl"
            >
              {'tasreefs' in section &&
                section.tasreefs.map((tasreef, j) => (
                  <Tasreef
                    key={`section-${i}-tasreef-${j}`}
                    title={tasreef.title}
                    particle={section.particle}
                    groupMode="list"
                    rootLetters={tasreef.rootLetters}
                    tense={tasreef.tense}
                    baseChapter={tasreef.baseChapter}
                    case={tasreef.case}
                    voice={tasreef.voice}
                  />
                ))}
              {'sarfSagheers' in section &&
                section.sarfSagheers.map((sarfSagheer, j) => (
                  <SarfSagheer
                    key={`section-${i}-tasreef-${j}`}
                    chapter={sarfSagheer.chapter}
                  />
                ))}
              {'chapters' in section &&
                section.chapters.map((chapter, j) => (
                  <Flex key={`section-${i}-mushtaqq-${j}`} gap={4}>
                    <Masdar chapter={chapter} />
                    <Faail chapter={chapter} />
                    <Mafool chapter={chapter} />
                  </Flex>
                ))}
            </Flex>
          </Flex>
        </div>
      ))}
    </Flex>
  )
}

export default OverviewScreen
