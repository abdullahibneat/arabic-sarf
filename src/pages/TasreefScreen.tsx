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

  const [activeTab, setActiveTab] = useState('معروف')

  const [verbCase, setVerbCase] = useState('مرفوع')

  const tabs = useMemo(() => ['معروف', 'مجهول', 'صرف سغير'].reverse(), [])
  const verbCases = useMemo(() => ['مرفوع', 'منصوب', 'مجزوم'].reverse(), [])

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

  const chapter = useMemo(() => {
    const $chapter = baseChapter ? replaceRoots(baseChapter, rootLetters) : null

    if ($chapter) {
      document.title = $chapter.title
    }

    return $chapter
  }, [rootLetters])

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

    const tasreef = chapter.conjugations[tense][voice]

    if (!tasreef) return null

    return { tasreef, particle }
  }, [chapter, verbCase, activeTab])

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
    <Flex flex={1} column gap={32} padding="16px 0 32px">
      <Flex column gap={16}>
        <Flex column gap={8} alignItems="center">
          <Flex gap={8}>
            <Text type="bold">{chapter.title}</Text>

            {settings.showRootLettersEditor && (
              <IconButton
                size="micro"
                name="chevron-down"
                onClick={() =>
                  setRootLettersEditorCollapsed(!rootLettersEditorCollapsed)
                }
              />
            )}
          </Flex>

          {settings.showRootLettersEditor && (
            <div
              class={`root-letters-editor-revealer ${rootLettersEditorCollapsed ? 'collapsed' : ''}`}
            >
              <div class="root-letters-editor-wrapper">
                <RootLettersEditor
                  rootLetters={{
                    ف: chapter.root_letters[0][0],
                    ع: chapter.root_letters[0][1],
                    ل: chapter.root_letters[0][2],
                  }}
                  onChange={setRootLetters}
                />
              </div>
            </div>
          )}
        </Flex>

        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      </Flex>

      <Flex column gap={16} justifyContent="center">
        {activeTab === 'صرف سغير' && (
          <Flex column padding="0 16px" alignItems="center">
            <SarfSagheer chapter={chapter} />
          </Flex>
        )}

        {showVerbTasreefs && (
          <Flex alignSelf="center">
            <Segmented
              value={verbCase}
              options={verbCases.map((verbCase) => ({
                label: verbCase,
                value: verbCase,
              }))}
              onChange={({ value: verbCase }) => setVerbCase(verbCase)}
            />
          </Flex>
        )}

        {showVerbTasreefs && (
          <Flex
            gap={16}
            justifyContent="center"
            padding="0 64px"
            overflowX="auto"
            direction="rtl"
          >
            {verbCase === 'مرفوع' && (
              <div style={{ direction: 'ltr' }}>
                <Tasreef
                  title="ماضي"
                  tasreef={
                    chapter.conjugations.ماضي[
                      activeTab === 'مجهول' ? 'مجهول' : 'معروف'
                    ]
                  }
                  audioSrc={audioPath + '/ماضي.mp3'}
                />
              </div>
            )}

            {mudari && (
              <div style={{ direction: 'ltr' }}>
                <Tasreef
                  title="مضارع"
                  tasreef={mudari.tasreef}
                  particle={mudari.particle}
                  audioSrc={audioPath + '/مضارع.mp3'}
                />
              </div>
            )}

            {settings.showAmr && verbCase === 'مجزوم' && (
              <div style={{ direction: 'ltr' }}>
                <Tasreef
                  title="أمر"
                  tasreef={chapter.conjugations.أمر}
                  audioSrc={audioPath + '/أمر.mp3'}
                />
              </div>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default TasreefScreen
