import Flex from '../components/Flex'
import Tasreef from '../components/Tasreef'
import Text from '../components/Text'
import isMujarrad from '../helpers/isMujarrad'
import replaceRoots from '../helpers/replaceRoots'
import { useMemo } from 'preact/hooks'
import { useRoute } from 'preact-iso'
import verbTypes from '../../data'

const TasreefScreen = () => {
  const params = useRoute().params

  const chapter = useMemo(() => {
    const type = verbTypes[params.type]

    if (!type) return null

    const form = type[params.form]

    if (!form) return null

    const chapter = isMujarrad(form) ? form[params.chapter] : form

    return chapter ? replaceRoots(chapter) : null
  }, [params.type, params.form, params.chapter])

  const audioPath = useMemo(() => {
    let path = `/recordings/${chapter?.type}/${chapter?.form}`

    if (chapter?.form === 1) {
      path += `/${chapter.باب}`
    }

    return path
  }, [chapter])

  if (!chapter) return <div>Not found</div>

  return (
    <Flex column gap={32} padding="32px 0">
      <Text type="bold" style={{ textAlign: 'center' }}>
        {chapter.title}
      </Text>

      <Flex justifyContent="center">
        <Flex gap={32} padding="0 64px" overflowX="auto" direction="rtl">
          <div style={{ direction: 'ltr' }}>
            <Tasreef
              title="ماضي"
              tasreef={chapter.conjugations.ماضي.معروف}
              audioSrc={audioPath + '/ماضي.mp3'}
            />
          </div>
          <div style={{ direction: 'ltr' }}>
            <Tasreef
              title="مضارع"
              tasreef={chapter.conjugations.مضارع.معروف}
              audioSrc={audioPath + '/مضارع.mp3'}
            />
          </div>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TasreefScreen
