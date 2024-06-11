import '../styles/TasreefNavigationHeader.scss'

import { useCallback, useEffect, useMemo } from 'preact/hooks'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import Flex from './Flex'
import Segmented from './Segmented'
import Tabs from './Tabs'
import useAppState from '../hooks/useAppState'
import useChapterStateContext from '../hooks/useChapterState'

const TasreefNavigationHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { chapter } = useChapterStateContext()

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
