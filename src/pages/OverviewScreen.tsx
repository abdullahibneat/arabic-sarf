import Tasreef, { TasreefProps } from '../components/Tasreef'
import { useCallback, useMemo } from 'preact/hooks'

import Flex from '../components/Flex'
import Screen from '../components/Screen'
import Text from '../components/Text'
import { VerbTypes } from '../../data/types'
import isMujarrad from '../helpers/isMujarrad'
import replaceRoots from '../helpers/replaceRoots'
import useAppState from '../hooks/useAppState'
import { useRoute } from 'preact-iso'
import verbTypes from '../../data'

const OverviewScreen = () => {
  const params = useRoute().params

  const { settings } = useAppState()

  const generateOverviewForVerbType = useCallback(
    (verbTypeKey: string, verbType: VerbTypes) => {
      const $sections: Array<{
        title: string
        subHeading: string
        tasreefs: TasreefProps[]
      }> = [
        {
          title: `${verbTypeKey} - ماضي`,
          subHeading: 'Forms 1a to 1f',
          tasreefs: [],
        },
        {
          title: `${verbTypeKey} - مضارع`,
          subHeading: 'Forms 1a to 1f',
          tasreefs: [],
        },
        {
          title: `${verbTypeKey} - ماضي`,
          subHeading: 'Forms 2 to 10',
          tasreefs: [],
        },
        {
          title: `${verbTypeKey} - مضارع`,
          subHeading: 'Forms 2 to 10',
          tasreefs: [],
        },
      ]

      for (const value of Object.values(verbType)) {
        if (isMujarrad(value)) {
          const letters = ['a', 'b', 'c', 'd', 'e', 'f']

          for (const archetype of Object.values(value)) {
            const chapter = replaceRoots(archetype!)

            const letter = letters.shift()

            $sections[0].tasreefs.push({
              title: `1${letter} - ${chapter.archetype.ماضي.معروف} ${chapter.archetype.مضارع.معروف}`,
              verbTasreef: chapter.conjugations.ماضي.معروف,
            })

            $sections[1].tasreefs.push({
              title: `1${letter} - ${chapter.archetype.ماضي.معروف} ${chapter.archetype.مضارع.معروف}`,
              verbTasreef: chapter.conjugations.مضارع.معروف,
            })
          }
        } else if (value) {
          const chapter = replaceRoots(value)
          $sections[2].tasreefs.push({
            title: `${chapter.form} - ${chapter.archetype.ماضي.معروف} ${chapter.archetype.مضارع.معروف}`,
            verbTasreef: chapter.conjugations.ماضي.معروف,
          })

          $sections[3].tasreefs.push({
            title: `${chapter.form} - ${chapter.archetype.ماضي.معروف} ${chapter.archetype.مضارع.معروف}`,
            verbTasreef: chapter.conjugations.مضارع.معروف,
          })
        }
      }

      return $sections
    },
    [],
  )

  const sections = useMemo(() => {
    const $verbTypes: Record<string, VerbTypes[]> = {}
    if (params.verbType) {
      const verbType = verbTypes[params.verbType]
      if (verbType) {
        $verbTypes[params.verbType] = [verbType]
      }
    } else {
      for (const verbTypeKey of Object.keys(verbTypes)) {
        if (settings.hiddenVerbTypes.includes(verbTypeKey)) {
          continue
        }
        $verbTypes[verbTypeKey] = [verbTypes[verbTypeKey]!]
      }
    }
    return Object.entries($verbTypes).flatMap(([verbTypeKey, verbTypes]) =>
      verbTypes.flatMap((verbType) =>
        generateOverviewForVerbType(verbTypeKey, verbType),
      ),
    )
  }, [params.verbType, settings.hiddenVerbTypes])

  return (
    <Screen>
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
                      verbTasreef={tasreef.verbTasreef}
                      groupMode="list"
                    />
                  </div>
                ))}
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Screen>
  )
}

export default OverviewScreen
