import '../styles/TasreefScreen.scss'

import { useEffect, useMemo } from 'preact/hooks'

import Flex from '../components/Flex'
import SarfSagheer from '../components/SarfSagheer'
import Tasreef from '../components/Tasreef'
import TasreefToolbar from '../components/TasreefToolbar'
import useAppState from '../hooks/useAppState'
import useChapterStateContext from '../hooks/useChapterState'
import { useSearchParams } from 'react-router-dom'
import useToolbar from '../hooks/useToolbar'

const TasreefScreen = () => {
  const { rootLetters, baseChapter, chapter } = useChapterStateContext()

  const [searchParams] = useSearchParams()

  const voice = searchParams.get('voice') || 'معروف'
  const verbCase = searchParams.get('verbCase') || 'مرفوع'

  const toolbar = useToolbar()
  const { settings } = useAppState()

  useEffect(() => {
    toolbar.show(<TasreefToolbar />)
    return () => toolbar.close()
  }, [])

  const mudariParticle = useMemo(() => {
    if (!settings.showNasbJazmParticle) {
      return
    }

    let particle = ''

    if (verbCase === 'منصوب') {
      particle = 'لن'
    }
    if (verbCase === 'مجزوم') {
      particle = 'لم'
    }

    return particle
  }, [settings.showNasbJazmParticle, verbCase])

  const showAmr = useMemo(() => {
    if (!settings.showAmr) return false
    if (voice !== 'معروف') return false
    if (verbCase !== 'مجزوم') return false
    return true
  }, [settings.showAmr, voice, verbCase])

  const audioPath = useMemo(() => {
    let path = `/recordings/${baseChapter?.type}/${baseChapter?.form}`

    if (baseChapter?.form === 1) {
      path += `/${baseChapter.chapter}`
    }

    return path
  }, [baseChapter])

  const showVerbTasreefs = useMemo(
    () => voice === 'معروف' || voice === 'مجهول',
    [voice],
  )

  if (!baseChapter || !baseChapter || !chapter) return <div>Not found</div>

  return (
    <Flex flex={1} column gap={16}>
      <Flex column gap={16} justifyContent="center">
        {voice === 'صرف صغير' && (
          <Flex column padding="0 1rem" alignItems="center">
            <SarfSagheer chapter={chapter} />
          </Flex>
        )}

        {showVerbTasreefs && (
          <Flex justifyContent="center">
            <Flex
              gap={32}
              padding="0 64px 32px"
              overflowX="auto"
              direction="rtl"
            >
              <Tasreef
                title="ماضي"
                audioSrc={audioPath + '/ماضي.mp3'}
                rootLetters={rootLetters}
                tense="ماضي"
                baseChapter={baseChapter}
                case={verbCase}
                voice={voice}
              />

              <Tasreef
                title="مضارع"
                particle={mudariParticle}
                audioSrc={audioPath + '/مضارع.mp3'}
                rootLetters={rootLetters}
                tense="مضارع"
                baseChapter={baseChapter}
                case={verbCase}
                voice={voice}
              />

              {showAmr && (
                <Tasreef
                  title="أمر"
                  audioSrc={audioPath + '/أمر.mp3'}
                  rootLetters={rootLetters}
                  tense="أمر"
                  baseChapter={baseChapter}
                  case={verbCase}
                  voice={voice}
                />
              )}
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default TasreefScreen
