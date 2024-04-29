import '../styles/OverviewScreen.scss'

import Tasreef, { TasreefProps } from '../components/Tasreef'
import { useCallback, useMemo } from 'preact/hooks'

import Flex from '../components/Flex'
import Text from '../components/Text'
import { VerbTypeMap } from '../../data/types'
import getMazeedFihiChapterHeading from '../helpers/getMazeedFihiChapterHeading'
import getMujarradChapterHeading from '../helpers/getMujarradChapterHeading'
import isMujarrad from '../helpers/isMujarrad'
import replaceRoots from '../helpers/replaceRoots'
import useAppState from '../hooks/useAppState'
import { useRoute } from 'preact-iso'
import verbTypes from '../../data'

const OverviewScreen = () => {
  const params = useRoute().params

  const { settings } = useAppState()

  const generateOverviewForVerbType = useCallback(
    (type: string, verbMap: VerbTypeMap) => {
      const $sections: Array<{
        title: string
        tasreefs: TasreefProps[]
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

            mujarradMadi.tasreefs.push({
              title: getMujarradChapterHeading(chapter.باب),
              tasreef: chapter.conjugations.ماضي.معروف,
            })

            mujarradMudari.tasreefs.push({
              title: getMujarradChapterHeading(chapter.باب),
              tasreef: chapter.conjugations.مضارع.معروف,
            })
          }
        } else if (chapter) {
          const archetype = replaceRoots(chapter)

          mazeedFihiMadi.tasreefs.push({
            title: getMazeedFihiChapterHeading(archetype.form),
            tasreef: archetype.conjugations.ماضي.معروف,
          })

          mazeedFihiMudari.tasreefs.push({
            title: getMazeedFihiChapterHeading(archetype.form),
            tasreef: archetype.conjugations.مضارع.معروف,
          })
        }
      }

      return $sections
    },
    [settings.mujarradChapterHeadings, settings.mazeedFihiChapterHeadings],
  )

  const sections = useMemo(() => {
    const $verbTypes: Record<string, VerbTypeMap[]> = {}

    if (params.type) {
      const verbType = verbTypes[params.type]

      if (verbType) {
        $verbTypes[params.type] = [verbType]
      }
    } else {
      for (const verbTypeKey of Object.keys(verbTypes)) {
        if (settings.hiddenVerbTypes.includes(verbTypeKey)) {
          continue
        }

        $verbTypes[verbTypeKey] = [verbTypes[verbTypeKey]!]
      }
    }

    return Object.entries($verbTypes).flatMap(([type, verbMap]) =>
      verbMap.flatMap((verbType) =>
        generateOverviewForVerbType(type, verbType),
      ),
    )
  }, [params.type, settings.hiddenVerbTypes, generateOverviewForVerbType])

  return (
    <Flex column padding="16px 0 32px">
      {sections.map((section, i) => (
        <div key={`section-${i}`} class="section">
          <Text type="bold" style={{ textAlign: 'center' }}>
            {section.title}
          </Text>

          <Flex justifyContent="center">
            <Flex gap={32} padding="0 64px" overflowX="auto" direction="rtl">
              {section.tasreefs.map((tasreef, j) => (
                <div
                  key={`section-${i}-tasreef-${j}`}
                  style={{ direction: 'ltr' }}
                >
                  <Tasreef
                    title={tasreef.title}
                    tasreef={tasreef.tasreef}
                    groupMode="list"
                  />
                </div>
              ))}
            </Flex>
          </Flex>
        </div>
      ))}
    </Flex>
  )
}

export default OverviewScreen
