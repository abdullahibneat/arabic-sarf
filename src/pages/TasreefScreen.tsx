import '../styles/TasreefScreen.scss'

import Flex from '../components/Flex'
import SarfSagheer from '../components/SarfSagheer'
import Tasreef from '../components/Tasreef'
import { VerbConjugations } from '../../data/types'
import generateEnglishTasreefs from '../helpers/generateEnglishTasreefs'
import useAppState from '../hooks/useAppState'
import useChapterStateContext from '../hooks/useChapterState'
import { useMemo } from 'preact/hooks'
import { useSearchParams } from 'react-router-dom'

const TasreefScreen = () => {
  const { chapter } = useChapterStateContext()

  const [searchParams] = useSearchParams()

  const activeTab = searchParams.get('activeTab') || 'معروف'
  const verbCase = searchParams.get('verbCase') || 'مرفوع'

  const { settings, showEnglish } = useAppState()

  const english = useMemo(() => {
    if (!chapter) return null
    if (!showEnglish) return null
    return generateEnglishTasreefs(chapter.root_letters[0].english)
  }, [chapter, showEnglish])

  const madi = useMemo(() => {
    if (!chapter) return null
    if (verbCase !== 'مرفوع') return null
    if (activeTab === 'مجهول')
      return (english || chapter.conjugations).ماضي.مجهول
    return (english || chapter.conjugations).ماضي.معروف
  }, [chapter, verbCase, activeTab, english])

  const mudari = useMemo(() => {
    if (!chapter) return null

    let tense: keyof VerbConjugations = 'مضارع'
    const voice = activeTab === 'مجهول' ? 'مجهول' : 'معروف'
    let particle = ''

    if (verbCase === 'منصوب') {
      tense = 'نصب'
      particle = 'لن'
    }
    if (verbCase === 'مجزوم') {
      tense = 'جزم'
      particle = 'لم'
    }

    if (!settings.showNasbJazmParticle || english) {
      particle = ''
    }

    const tasreef = (english || chapter.conjugations)[tense][voice]

    if (!tasreef) return null

    return { tasreef, particle }
  }, [chapter, english, verbCase, activeTab, settings.showNasbJazmParticle])

  const amr = useMemo(() => {
    if (!settings.showAmr) return null
    if (activeTab !== 'معروف') return null
    if (verbCase !== 'مجزوم') return null
    if (!chapter) return null
    return (english || chapter.conjugations).أمر
  }, [settings.showAmr, activeTab, verbCase, chapter, english])

  const audioPath = useMemo(() => {
    let path = `/recordings/${chapter?.type}/${chapter?.form}`

    if (chapter?.form === 1) {
      path += `/${chapter.باب}`
    }

    return path
  }, [chapter])

  const showVerbTasreefs = useMemo(
    () => activeTab === 'معروف' || activeTab === 'مجهول',
    [activeTab],
  )

  if (!chapter) return <div>Not found</div>

  return (
    <Flex flex={1} column gap={16} paddingBottom={32}>
      <Flex column gap={16} justifyContent="center">
        {activeTab === 'صرف صغير' && (
          <Flex column padding="0 1rem" alignItems="center">
            <SarfSagheer chapter={chapter} />
          </Flex>
        )}

        {showVerbTasreefs && (
          <Flex justifyContent="center">
            <Flex gap={32} padding="0 64px" overflowX="auto" direction="rtl">
              <Tasreef
                title="ماضي"
                tasreef={madi}
                audioSrc={audioPath + '/ماضي.mp3'}
              />

              <Tasreef
                title="مضارع"
                tasreef={mudari?.tasreef || null}
                particle={mudari?.particle}
                audioSrc={audioPath + '/مضارع.mp3'}
              />

              {amr && (
                <Tasreef
                  title="أمر"
                  tasreef={amr}
                  audioSrc={audioPath + '/أمر.mp3'}
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
