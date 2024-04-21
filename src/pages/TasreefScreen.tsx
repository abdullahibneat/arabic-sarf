import RootLettersEditor, { RootLetters } from '../components/RootLettersEditor'
import { useMemo, useState } from 'preact/hooks'

import Flex from '../components/Flex'
import Tasreef from '../components/Tasreef'
import Text from '../components/Text'
import isMujarrad from '../helpers/isMujarrad'
import replaceRoots from '../helpers/replaceRoots'
import useAppState from '../hooks/useAppState'
import { useRoute } from 'preact-iso'
import verbTypes from '../../data'

const TasreefScreen = () => {
  const [rootLetters, setRootLetters] = useState<RootLetters>({
    ف: 'ف',
    ع: 'ع',
    ل: 'ل',
  })

  const params = useRoute().params

  const { settings } = useAppState()

  const baseChapter = useMemo(() => {
    const type = verbTypes[params.type]

    if (!type) return null

    const form = type[params.form]

    if (!form) return null

    const chapter = isMujarrad(form) ? form[params.chapter] : form

    if (chapter) {
      setRootLetters({
        ف: chapter.root_letters[0][0],
        ع: chapter.root_letters[0][1],
        ل: chapter.root_letters[0][2],
      })

      return chapter
    } else {
      return null
    }
  }, [params.type, params.form, params.chapter])

  const chapter = useMemo(
    () => (baseChapter ? replaceRoots(baseChapter, rootLetters) : null),
    [rootLetters],
  )

  const audioPath = useMemo(() => {
    let path = `/recordings/${baseChapter?.type}/${baseChapter?.form}`

    if (baseChapter?.form === 1) {
      path += `/${baseChapter.باب}`
    }

    return path
  }, [baseChapter])

  if (!chapter) return <div>Not found</div>

  return (
    <Flex column gap={32} padding="32px 0">
      {settings.showRootLettersEditor && (
        <Flex alignSelf="center">
          <RootLettersEditor
            rootLetters={{
              ف: chapter.root_letters[0][0],
              ع: chapter.root_letters[0][1],
              ل: chapter.root_letters[0][2],
            }}
            onChange={setRootLetters}
          />
        </Flex>
      )}

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

          {settings.showNasb && (
            <div style={{ direction: 'ltr' }}>
              <Tasreef
                title="نصب"
                tasreef={chapter.conjugations.نصب.معروف}
                particle="لَنْ"
                audioSrc={audioPath + '/نصب.mp3'}
              />
            </div>
          )}

          {settings.showJazm && (
            <div style={{ direction: 'ltr' }}>
              <Tasreef
                title="جزم"
                tasreef={chapter.conjugations.جزم.معروف}
                particle="لَمْ"
                audioSrc={audioPath + '/جزم.mp3'}
              />
            </div>
          )}

          {settings.showAmr && (
            <div style={{ direction: 'ltr' }}>
              <Tasreef
                title="أمر"
                tasreef={chapter.conjugations.أمر}
                audioSrc={audioPath + '/أمر.mp3'}
              />
            </div>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TasreefScreen
