import '../styles/TasreefScreen.scss'

import RootLettersEditor, { RootLetters } from '../components/RootLettersEditor'
import { useMemo, useState } from 'preact/hooks'

import Flex from '../components/Flex'
import IconButton from '../components/IconButton'
import SarfSagheer from '../components/SarfSagheer'
import Segmented from '../components/Segmented'
import Tabs from '../components/Tabs'
import Tasreef from '../components/Tasreef'
import Text from '../components/Text'
import { VerbConjugations } from '../../data/types'
import isMujarrad from '../helpers/isMujarrad'
import replaceRoots from '../helpers/replaceRoots'
import useAppState from '../hooks/useAppState'
import useQuery from '../hooks/useQuery'
import { useRoute } from 'preact-iso'
import verbTypes from '../../data'

const TasreefScreen = () => {
  const [rootLetters, setRootLetters] = useState<RootLetters>({
    ف: 'ف',
    ع: 'ع',
    ل: 'ل',
  })

  const [rootLettersEditorCollapsed, setRootLettersEditorCollapsed] =
    useState(true)

  // const [activeTab, setActiveTab] = useState('معروف')
  // const [verbCase, setVerbCase] = useState('مرفوع')

  const {
    query: { activeTab = 'معروف', verbCase = 'مرفوع' },
    ...query
  } = useQuery()
  const params = useRoute().params

  const { settings } = useAppState()

  const tabs = useMemo(() => {
    const $tabs = ['معروف']

    if (settings.showMajhool) $tabs.push('مجهول')
    if (settings.showSarfSagheer) $tabs.push('صرف صغير')

    return $tabs.reverse()
  }, [settings.showMajhool, settings.showSarfSagheer])

  const verbCases = useMemo(() => {
    const $verbCases = ['مرفوع']

    if (settings.showNasb) $verbCases.push('منصوب')
    if (settings.showJazm) $verbCases.push('مجزوم')

    return $verbCases.reverse()
  }, [settings.showNasb, settings.showJazm])

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

  const chapter = useMemo(() => {
    const $chapter = baseChapter ? replaceRoots(baseChapter, rootLetters) : null

    if ($chapter) {
      document.title = $chapter.title
    }

    return $chapter
  }, [rootLetters])

  const madi = useMemo(() => {
    if (!chapter) return null
    if (verbCase !== 'مرفوع') return null
    if (activeTab === 'مجهول') return chapter.conjugations.ماضي.مجهول
    return chapter.conjugations.ماضي.معروف
  }, [chapter, verbCase, activeTab])

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

    if (!settings.showNasbJazmParticle) {
      particle = ''
    }

    const tasreef = chapter.conjugations[tense][voice]

    if (!tasreef) return null

    return { tasreef, particle }
  }, [chapter, verbCase, activeTab, settings.showNasbJazmParticle])

  const amr = useMemo(() => {
    if (!settings.showAmr) return null
    if (activeTab !== 'معروف') return null
    if (verbCase !== 'مجزوم') return null
    if (!chapter) return null
    return chapter.conjugations.أمر
  }, [settings.showAmr, activeTab, verbCase, chapter])

  const audioPath = useMemo(() => {
    let path = `/recordings/${baseChapter?.type}/${baseChapter?.form}`

    if (baseChapter?.form === 1) {
      path += `/${baseChapter.باب}`
    }

    return path
  }, [baseChapter])

  const showVerbTasreefs = useMemo(
    () => activeTab === 'معروف' || activeTab === 'مجهول',
    [activeTab],
  )

  if (!chapter) return <div>Not found</div>

  return (
    <Flex flex={1} column gap={16} padding="16px 0 32px">
      <Flex column alignItems="center">
        <div class="title">
          <Text type="bold">{chapter.title}</Text>

          {settings.showRootLettersEditor && (
            <div class="collapse-icon">
              <IconButton
                size="micro"
                name="chevron-down"
                onClick={() =>
                  setRootLettersEditorCollapsed(!rootLettersEditorCollapsed)
                }
              />
            </div>
          )}
        </div>

        {settings.showRootLettersEditor && (
          <div
            class={`root-letters-editor-revealer ${
              rootLettersEditorCollapsed ? 'collapsed' : ''
            }`}
          >
            <div class="root-letters-editor-wrapper">
              <RootLettersEditor
                rootLetters={{
                  ف: chapter.root_letters[0][0],
                  ع: chapter.root_letters[0][1],
                  ل: chapter.root_letters[0][2],
                }}
                mithaal={params.type === 'مثال'}
                ajwaf={params.type === 'أجوف'}
                naqis={params.type === 'ناقص'}
                onChange={setRootLetters}
              />
            </div>
          </div>
        )}
      </Flex>

      {tabs.length > 1 && (
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={(activeTab) => query.set('activeTab', activeTab)}
        />
      )}

      <Flex column gap={16} justifyContent="center">
        {activeTab === 'صرف صغير' && (
          <Flex column padding="0 1rem" alignItems="center">
            <SarfSagheer chapter={chapter} />
          </Flex>
        )}

        {showVerbTasreefs && verbCases.length > 1 && (
          <Flex alignSelf="center">
            <Segmented
              value={verbCase}
              options={verbCases.map((verbCase) => ({
                label: verbCase,
                value: verbCase,
              }))}
              onChange={({ value: verbCase }) =>
                query.set('verbCase', verbCase)
              }
            />
          </Flex>
        )}

        {showVerbTasreefs && (
          <Flex padding="0 64px" overflow="auto hidden" direction="rtl">
            <Flex gap={16}>
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
