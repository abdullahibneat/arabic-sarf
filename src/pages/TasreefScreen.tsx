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
  const { chapter, englishVerb, rootLetters, baseChapter } =
    useChapterStateContext()

  const [searchParams] = useSearchParams()

  const voice = searchParams.get('voice') || 'معروف'
  const verbCase = searchParams.get('verbCase') || 'مرفوع'

  const { settings } = useAppState()

  const english = useMemo(() => {
    if (!englishVerb) return null
    return generateEnglishTasreefs(englishVerb)
  }, [englishVerb])

  const madi = useMemo(() => {
    if (!chapter) return null
    if (verbCase !== 'مرفوع') return null
    if (voice === 'مجهول')
      return {
        base: baseChapter?.conjugations.ماضي.مجهول,
        arabic: chapter.conjugations.ماضي.مجهول,
        english: english?.ماضي.مجهول,
      }
    return {
      base: baseChapter?.conjugations.ماضي.معروف,
      arabic: chapter.conjugations.ماضي.معروف,
      english: english?.ماضي.معروف,
    }
  }, [chapter, baseChapter, verbCase, voice, english])

  const mudari = useMemo(() => {
    if (!chapter) return null

    let tense: keyof VerbConjugations = 'مضارع'
    const $voice = voice === 'مجهول' ? 'مجهول' : 'معروف'
    let particle = ''

    if (verbCase === 'منصوب') {
      tense = 'نصب'
      particle = 'لن'
    }
    if (verbCase === 'مجزوم') {
      tense = 'جزم'
      particle = 'لم'
    }

    if (!settings.showNasbJazmParticle) {
      particle = ''
    }

    const tasreef = chapter.conjugations[tense][$voice]

    if (!tasreef) return null

    return {
      particle,
      tasreef: {
        base: baseChapter?.conjugations[tense][$voice],
        arabic: tasreef,
        english: english?.[tense][voice],
      },
    }
  }, [
    chapter,
    baseChapter,
    english,
    verbCase,
    voice,
    settings.showNasbJazmParticle,
  ])

  const amr = useMemo(() => {
    if (!settings.showAmr) return null
    if (voice !== 'معروف') return null
    if (verbCase !== 'مجزوم') return null
    if (!chapter) return null
    return {
      base: baseChapter?.conjugations.أمر,
      arabic: chapter.conjugations.أمر,
      english: english?.أمر,
    }
  }, [settings.showAmr, voice, verbCase, chapter, baseChapter, english])

  const audioPath = useMemo(() => {
    let path = `/recordings/${chapter?.type}/${chapter?.form}`

    if (chapter?.form === 1) {
      path += `/${chapter.باب}`
    }

    return path
  }, [chapter])

  const showVerbTasreefs = useMemo(
    () => voice === 'معروف' || voice === 'مجهول',
    [voice],
  )

  if (!chapter || !baseChapter) return <div>Not found</div>

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
                tasreef={madi?.arabic}
                englishTasreef={madi?.english}
                audioSrc={audioPath + '/ماضي.mp3'}
                rootLetters={rootLetters}
                tense="ماضي"
                baseTasreef={madi?.base}
                baseChapter={baseChapter}
                case={verbCase}
                voice={voice}
              />

              <Tasreef
                title="مضارع"
                particle={mudari?.particle}
                tasreef={mudari?.tasreef.arabic || null}
                englishTasreef={mudari?.tasreef.english || null}
                audioSrc={audioPath + '/مضارع.mp3'}
                rootLetters={rootLetters}
                tense="مضارع"
                baseTasreef={mudari?.tasreef.base}
                baseChapter={baseChapter}
                case={verbCase}
                voice={voice}
              />

              {amr && (
                <Tasreef
                  title="أمر"
                  tasreef={amr.arabic}
                  englishTasreef={amr.english}
                  audioSrc={audioPath + '/أمر.mp3'}
                  rootLetters={rootLetters}
                  tense="أمر"
                  baseTasreef={amr.base}
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
