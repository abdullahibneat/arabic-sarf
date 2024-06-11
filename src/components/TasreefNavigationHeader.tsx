import '../styles/TasreefNavigationHeader.scss'

import { useCallback, useEffect, useMemo } from 'preact/hooks'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import Flex from './Flex'
import IconButton from './IconButton'
import { JSX } from 'preact/jsx-runtime'
import Popover from './Popover'
import RootLettersEditor from './RootLettersEditor'
import Segmented from './Segmented'
import Tabs from './Tabs'
import Text from './Text'
import useAppState from '../hooks/useAppState'
import useChapterStateContext from '../hooks/useChapterState'

const TasreefNavigationHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    chapter,
    rootLetters,
    persistRootLetters,
    setRootLetters,
    togglePersistRootLetters,
  } = useChapterStateContext()

  const { settings } = useAppState()

  const location = useLocation()
  const navigate = useNavigate()

  const isFlashcardMode = useMemo(
    () => location.pathname.includes('/flashcards'),
    [location.pathname],
  )

  const tab = isFlashcardMode
    ? 'Flashcards'
    : searchParams.get('voice') || 'معروف'

  const verbCase = searchParams.get('verbCase') || 'مرفوع'

  useEffect(() => {
    if (chapter) {
      document.title = chapter.title
    } else {
      document.title = 'Sarf'
    }
  }, [chapter])

  const showVerbTasreefs = useMemo(
    () => tab === 'معروف' || tab === 'مجهول',
    [tab],
  )

  const tabs = useMemo(() => {
    const $tabs = ['معروف']

    if (settings.showMajhool) $tabs.push('مجهول')
    if (settings.showSarfSagheer) $tabs.push('صرف صغير')

    $tabs.push('Flashcards')

    return $tabs.reverse()
  }, [settings.showMajhool, settings.showSarfSagheer])

  const verbCases = useMemo(() => {
    const $verbCases = ['مرفوع']

    if (settings.showNasb) $verbCases.push('منصوب')
    if (settings.showJazm) $verbCases.push('مجزوم')

    return $verbCases.reverse()
  }, [settings.showNasb, settings.showJazm])

  const onSelectRootLetters = useCallback(
    (event: JSX.TargetedEvent<HTMLSelectElement>) => {
      if (event.target instanceof HTMLSelectElement) {
        const arabic = event.target.value
        const rootLetters = chapter?.root_letters.find(
          ($rootLetters) => asValue($rootLetters.arabic) === arabic,
        )
        if (rootLetters) {
          setRootLetters(rootLetters.arabic, rootLetters.english)
        }
      }
    },
    [chapter],
  )

  const handleTabClick = useCallback(
    (tab: string) => {
      if (tab === 'Flashcards') {
        if (isFlashcardMode) return
        navigate({
          pathname: [
            location.pathname,
            location.pathname.endsWith('/') ? '' : '/',
            'flashcards',
          ].join(''),
        })
      } else {
        searchParams.set('voice', tab)
        setSearchParams(searchParams)
        if (isFlashcardMode) {
          navigate({
            pathname: location.pathname.replace('/flashcards', '/'),
            search: '?' + searchParams.toString(),
          })
        }
      }
    },
    [isFlashcardMode, location.pathname, searchParams],
  )

  return (
    <Flex column gap={16} paddingBottom={16}>
      <Flex column gap={16} paddingTop={16} backgroundColor="var(--white)">
        {chapter && (
          <Flex column alignItems="center">
            <div class="title">
              <Text type="bold">{chapter.title}</Text>

              {settings.showRootLettersEditor && (
                <div class="collapse-icon">
                  <Popover
                    content={
                      <Flex column gap={8} alignItems="center" width={200}>
                        <RootLettersEditor
                          rootLetters={rootLetters || undefined}
                          mithaal={chapter.type === 'مثال'}
                          ajwaf={chapter.type === 'أجوف'}
                          naqis={chapter.type === 'ناقص'}
                          onChange={setRootLetters}
                        />

                        {chapter.root_letters.length > 0 && (
                          <Flex column alignSelf="stretch">
                            <label for="preset-root-letters">Presets</label>
                            <select
                              id="preset-root-letters"
                              value={asValue(rootLetters)}
                              onChange={onSelectRootLetters}
                            >
                              {chapter.root_letters.map(({ arabic }) => (
                                <option key={arabic} value={asValue(arabic)}>
                                  {asValue(arabic)}
                                </option>
                              ))}
                            </select>
                          </Flex>
                        )}

                        {rootLetters && (
                          <div
                            class="reset-root-letters"
                            onClick={() =>
                              setRootLetters(chapter.root_letters[0].arabic)
                            }
                          >
                            <Text type="small">Reset</Text>
                          </div>
                        )}

                        <Flex gap={8} alignItems="center">
                          <input
                            id="persistRootLetters"
                            type="checkbox"
                            checked={persistRootLetters}
                            onChange={togglePersistRootLetters}
                          />
                          <label
                            for="persistRootLetters"
                            style={{ userSelect: 'none' }}
                          >
                            Remember root letters
                          </label>
                        </Flex>
                      </Flex>
                    }
                  >
                    {({ visible, setVisible }) => (
                      <IconButton
                        size="micro"
                        name="chevron-down"
                        onClick={() => setVisible(!visible)}
                      />
                    )}
                  </Popover>
                </div>
              )}
            </div>
          </Flex>
        )}

        {tabs.length > 1 && (
          <Tabs tabs={tabs} activeTab={tab} onTabClick={handleTabClick} />
        )}
      </Flex>

      {showVerbTasreefs && verbCases.length > 1 && (
        <Flex alignSelf="center">
          <Segmented
            value={verbCase}
            options={verbCases.map((verbCase) => ({
              label: verbCase,
              value: verbCase,
            }))}
            onChange={({ value: verbCase }) => {
              searchParams.set('verbCase', verbCase)
              setSearchParams(searchParams)
            }}
          />
        </Flex>
      )}
    </Flex>
  )
}

export default TasreefNavigationHeader

const asValue = (rootLetters: { ف: string; ع: string; ل: string }) =>
  rootLetters.ف + rootLetters.ع + rootLetters.ل
