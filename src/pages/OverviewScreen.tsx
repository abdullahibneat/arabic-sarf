import '../styles/OverviewScreen.scss'

import SarfSagheer, { SarfSagheerProps } from '../components/SarfSagheer'
import Tasreef, { TasreefProps } from '../components/Tasreef'
import { useCallback, useMemo } from 'preact/hooks'
import { useParams, useSearchParams } from 'react-router-dom'

import Flex from '../components/Flex'
import Text from '../components/Text'
import { VerbTypeMap } from '../../data/types'
import generateEnglishConjugations from '../helpers/generateEnglishConjugations'
import getMazeedFihiChapterHeading from '../helpers/getMazeedFihiChapterHeading'
import getMujarradChapterHeading from '../helpers/getMujarradChapterHeading'
import isMujarrad from '../helpers/isMujarrad'
import replaceRoots from '../helpers/replaceRoots'
import useAppState from '../hooks/useAppState'
import verbTypes from '../../data'

const OverviewScreen = () => {
  const params = useParams()

  const [searchParams] = useSearchParams()

  const { settings } = useAppState()

  const voice = searchParams.get('voice') || 'معروف'
  const verbCase = searchParams.get('verbCase') || 'مرفوع'

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
    (type: string, verbMap: VerbTypeMap) => {
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

      for (const chapter of Object.values(verbMap)) {
        if (isMujarrad(chapter)) {
          for (const archetype of Object.values(chapter)) {
            const chapter = replaceRoots(archetype!)
            mujarrad.sarfSagheers.push({ chapter })
          }
        } else if (chapter) {
          const archetype = replaceRoots(chapter)
          mazeedFihi.sarfSagheers.push({ chapter: archetype })
        }
      }

      return $sections
    },
    [settings.mujarradChapterHeadings],
  )

  const generateTasreefOverviewForVerbType = useCallback(
    (type: string, verbMap: VerbTypeMap) => {
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

      for (const chapter of Object.values(verbMap)) {
        if (isMujarrad(chapter)) {
          for (const archetype of Object.values(chapter)) {
            const chapter = replaceRoots(archetype!)
            const english = generateEnglishConjugations(
              chapter.root_letters[0].english,
            )

            mujarradMadi.tasreefs.push({
              title: getMujarradChapterHeading(chapter.باب),
              tasreef: chapter.conjugations[pastConjugation]?.[voice],
              englishTasreef: english[pastConjugation]?.[voice],
              rootLetters: chapter.root_letters[0].arabic,
              tense: 'ماضي',
              baseChapter: archetype!,
              case: verbCase,
              voice,
            })

            mujarradMudari.tasreefs.push({
              title: getMujarradChapterHeading(chapter.باب),
              tasreef: chapter.conjugations[presentConjugation]?.[voice],
              englishTasreef: english[presentConjugation]?.[voice],
              rootLetters: chapter.root_letters[0].arabic,
              tense: 'مضارع',
              baseChapter: archetype!,
              case: verbCase,
              voice,
            })
          }
        } else if (chapter) {
          const archetype = replaceRoots(chapter)
          const english = generateEnglishConjugations(
            chapter.root_letters[0].english,
          )

          mazeedFihiMadi.tasreefs.push({
            title: getMazeedFihiChapterHeading(archetype.form),
            tasreef: archetype.conjugations[pastConjugation]?.[voice],
            englishTasreef: english[pastConjugation]?.[voice],
            rootLetters: chapter.root_letters[0].arabic,
            tense: 'ماضي',
            baseChapter: archetype,
            case: verbCase,
            voice,
          })

          mazeedFihiMudari.tasreefs.push({
            title: getMazeedFihiChapterHeading(archetype.form),
            tasreef: archetype.conjugations[presentConjugation]?.[voice],
            englishTasreef: english[presentConjugation]?.[voice],
            rootLetters: chapter.root_letters[0].arabic,
            tense: 'مضارع',
            baseChapter: archetype,
            case: verbCase,
            voice,
          })
        }
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

  const verbs = useMemo(() => {
    const $verbs: Record<string, VerbTypeMap[]> = {}

    if (params.type) {
      const verbType = verbTypes[params.type]

      if (verbType) {
        $verbs[params.type] = [verbType]
      }
    } else {
      for (const verbTypeKey of Object.keys(verbTypes)) {
        if (settings.hiddenVerbTypes.includes(verbTypeKey)) {
          continue
        }

        $verbs[verbTypeKey] = [verbTypes[verbTypeKey]!]
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

  const sections = useMemo(() => {
    if (voice === 'صرف صغير') return sarfSagheerSections
    return tasreefSections
  }, [voice, sarfSagheerSections, tasreefSections])

  return (
    <Flex column padding="16px 0 32px">
      {sections.map((section, i) => (
        <div key={`section-${i}`} class="section">
          <Text type="bold" style={{ textAlign: 'center' }}>
            {section.title}
          </Text>

          <Flex justifyContent="center">
            <Flex
              column={'sarfSagheers' in section}
              gap={32}
              padding="0 64px 32px"
              overflowX="auto"
              direction="rtl"
            >
              {'tasreefs' in section &&
                section.tasreefs.map((tasreef, j) => (
                  <Tasreef
                    key={`section-${i}-tasreef-${j}`}
                    title={tasreef.title}
                    tasreef={tasreef.tasreef}
                    englishTasreef={tasreef.englishTasreef}
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
            </Flex>
          </Flex>
        </div>
      ))}
    </Flex>
  )
}

export default OverviewScreen
