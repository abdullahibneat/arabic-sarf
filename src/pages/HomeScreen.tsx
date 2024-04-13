import Tasreef, { TasreefProps } from '../components/Tasreef'

import Flex from '../components/Flex'
import Screen from '../components/Screen'
import Text from '../components/Text'
import isVerbChapter from '../helpers/isVerbChapter'
import replaceRoots from '../helpers/replaceRoots'
import { useMemo } from 'preact/hooks'
import verbTypes from '../../data'

const HomeScreen = () => {
  const { صحيح } = verbTypes

  const sections = useMemo(() => {
    const $sections: Array<{
      title: string
      subHeading: string
      tasreefs: TasreefProps[]
    }> = [
      { title: 'ماضي', subHeading: 'Forms 1a to 1f', tasreefs: [] },
      { title: 'مضارع', subHeading: 'Forms 1a to 1f', tasreefs: [] },
      { title: 'ماضي', subHeading: 'Forms 2 to 10', tasreefs: [] },
      { title: 'مضارع', subHeading: 'Forms 2 to 10', tasreefs: [] },
    ]

    for (const value of Object.values(صحيح)) {
      if (isVerbChapter(value)) {
        const chapter = replaceRoots(value)
        $sections[2].tasreefs.push({
          title: `${chapter.form} - ${chapter.archetype.ماضي.معروف} ${chapter.archetype.مضارع.معروف}`,
          verbTasreef: chapter.conjugations.ماضي.معروف,
        })

        $sections[3].tasreefs.push({
          title: `${chapter.form} - ${chapter.archetype.ماضي.معروف} ${chapter.archetype.مضارع.معروف}`,
          verbTasreef: chapter.conjugations.مضارع.معروف,
        })
      } else if (value) {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f']

        for (const archetype of Object.values(value)) {
          const chapter = replaceRoots(archetype)

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
      }
    }

    return $sections
  }, [])

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

export default HomeScreen
