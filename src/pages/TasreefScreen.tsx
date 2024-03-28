import { VerbChapter, VerbType } from '../../data/types'

import Flex from '../components/Flex'
import Screen from '../components/Screen'
import Tasreef from '../components/Tasreef'
import Text from '../components/Text'
import asRomanNumeral from '../helpers/asRomanNumeral'
import isVerbChapter from '../helpers/isVerbChapter'
import { useMemo } from 'preact/hooks'
import { useRoute } from 'preact-iso'
import verbTypes from '../../data'

const TasreefScreen = () => {
  const params = useRoute().params

  const verbChapter = useMemo(() => {
    const verbType = verbTypes[params.verbType] as VerbType | undefined

    if (!verbType) return null

    const verbForm = verbType[asRomanNumeral(Number(params.verbForm))] as
      | Record<string, VerbChapter>
      | VerbChapter
      | undefined

    if (!verbForm) return null

    if (isVerbChapter(verbForm)) {
      return verbForm
    }

    return verbForm[params.verbChapter] || null
  }, [params.verbType, params.verbForm, params.verbChapter])

  const audioPath = useMemo(() => {
    let path = `/recordings/${params.verbType}/${asRomanNumeral(
      Number(params.verbForm),
    )}`

    if (verbChapter?.form === 1) {
      path += `/${verbChapter.باب}`
    }

    return path
  }, [params.verbType, params.verbForm, verbChapter])

  return (
    <Screen>
      {verbChapter && (
        <Flex column gap={32} padding="32px 0">
          <Text type="bold" style={{ textAlign: 'center' }}>
            {verbChapter.archetype.ماضي.معروف}{' '}
            {verbChapter.archetype.مضارع.معروف}
          </Text>

          <Flex justifyContent="center">
            <Flex gap={32} padding="0 64px" overflowX="auto" direction="rtl">
              <Tasreef
                title="ماضي"
                verbTasreef={verbChapter.conjugations.ماضي.معروف}
                audioSrc={audioPath + '/ماضي.mp3'}
              />
              <Tasreef
                title="مضارع"
                verbTasreef={verbChapter.conjugations.مضارع.معروف}
                audioSrc={audioPath + '/مضارع.mp3'}
              />
            </Flex>
          </Flex>
        </Flex>
      )}
    </Screen>
  )
}

export default TasreefScreen
