import Tasreef, { TasreefProps } from '../components/Tasreef'
import { useCallback, useMemo } from 'preact/hooks'

import Flex from '../components/Flex'
import Text from '../components/Text'
import { VerbTypeMap } from '../../data/types'
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
        subHeading: string
        tasreefs: TasreefProps[]
      }> = [
        {
          title: `${type} - ماضي`,
          subHeading: 'Forms 1a to 1f',
          tasreefs: [],
        },
        {
          title: `${type} - مضارع`,
          subHeading: 'Forms 1a to 1f',
          tasreefs: [],
        },
        {
          title: `${type} - ماضي`,
          subHeading: 'Forms 2 to 10',
          tasreefs: [],
        },
        {
          title: `${type} - مضارع`,
          subHeading: 'Forms 2 to 10',
          tasreefs: [],
        },
      ]

      const mujarradMadi = $sections[0]
      const mujarradMudari = $sections[1]
      const mazeedFihiMadi = $sections[2]
      const mazeedFihiMudari = $sections[3]

      for (const chapter of Object.values(verbMap)) {
        if (isMujarrad(chapter)) {
          const letters = ['a', 'b', 'c', 'd', 'e', 'f']

          for (const archetype of Object.values(chapter)) {
            const chapter = replaceRoots(archetype!)

            const letter = letters.shift()

            mujarradMadi.tasreefs.push({
              title: `1${letter} - ${chapter.archetype.ماضي.معروف} ${chapter.archetype.مضارع.معروف}`,
              tasreef: chapter.conjugations.ماضي.معروف,
            })

            mujarradMudari.tasreefs.push({
              title: `1${letter} - ${chapter.archetype.ماضي.معروف} ${chapter.archetype.مضارع.معروف}`,
              tasreef: chapter.conjugations.مضارع.معروف,
            })
          }
        } else if (chapter) {
          const archetype = replaceRoots(chapter)

          mazeedFihiMadi.tasreefs.push({
            title: `${archetype.form} - ${archetype.archetype.ماضي.معروف} ${archetype.archetype.مضارع.معروف}`,
            tasreef: archetype.conjugations.ماضي.معروف,
          })

          mazeedFihiMudari.tasreefs.push({
            title: `${archetype.form} - ${archetype.archetype.ماضي.معروف} ${archetype.archetype.مضارع.معروف}`,
            tasreef: archetype.conjugations.مضارع.معروف,
          })
        }
      }

      return $sections
    },
    [],
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
  }, [params.type, settings.hiddenVerbTypes])

  return (
    <Flex column gap={32} padding="32px 0">
      {sections.map((section, i) => (
        <Flex key={`section-${i}`} column gap={16}>
          <Flex column alignItems="center">
            <Text type="bold">{section.title}</Text>
            <Text>{section.subHeading}</Text>
          </Flex>

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
        </Flex>
      ))}
    </Flex>
  )
}

export default OverviewScreen
