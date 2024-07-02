import '../styles/TasreefToolbar.scss'

import { useCallback, useMemo } from 'preact/hooks'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

import { ComponentChildren } from 'preact'
import Icon from './Icon'
import RootLettersEditorModal from './RootLettersEditorModal'
import Text from './Text'
import useAppState from '../hooks/useAppState'
import useChapterStateContext from '../hooks/useChapterState'
import useModal from '../hooks/useModal'

const TasreefToolbar = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { settings } = useAppState()

  const { chapter } = useChapterStateContext()

  const location = useLocation()
  const params = useParams()
  const modal = useModal()
  const navigate = useNavigate()

  const verbCase = searchParams.get('verbCase') || 'مرفوع'
  const voice = searchParams.get('voice') || 'معروف'

  const mode = useMemo(() => {
    if (location.pathname.includes('/sarf_sagheer')) return 'صرف صغير'
    if (location.pathname.includes('/flashcards')) return 'Flashcards'
    // if (location.pathname.includes('/mushtaq')) return 'مشتق'
    return 'تصريف'
  }, [location.pathname])

  const modes = useMemo(() => ['تصريف', 'صرف صغير' /* 'مشتق' */], [])

  const nextMode = useMemo(() => {
    const currentIndex = modes.indexOf(mode)
    const nextIndex = currentIndex + 1
    return modes[nextIndex % modes.length]
  }, [mode])

  const verbCases = useMemo(() => {
    const $verbCases = ['مرفوع']

    if (settings.showNasb) $verbCases.push('منصوب')
    if (settings.showJazm) $verbCases.push('مجزوم')

    return $verbCases.reverse()
  }, [settings.showNasb, settings.showJazm])

  const showVerbControls = useMemo(() => mode === 'تصريف', [mode])

  const isFlashcardMode = useMemo(
    () => location.pathname.includes('/flashcards'),
    [location.pathname],
  )

  const canReplaceRootLetters = useMemo(
    () => chapter && settings.showRootLettersEditor,
    [chapter, settings.showRootLettersEditor],
  )

  const openRootLettersModal = useCallback(() => {
    modal.open({
      title: 'Edit root letters',
      width: 400,
      children: <RootLettersEditorModal />,
    })
  }, [])

  const toggleMode = useCallback(() => {
    const nextIndex = modes.indexOf(mode) + 1
    const nextMode = modes[nextIndex % modes.length]

    let route = '/'
    let searchParams: string[] = []

    if (params.type) {
      route += `${params.type}/`
    }

    if (params.form) {
      route += `${params.form}/`
    }

    if (nextMode === 'صرف صغير') {
      route += 'sarf_sagheer/'
    } else if (nextMode === 'مشتق') {
      route += 'mushtaq/'
    } else {
      if (verbCase !== 'مرفوع') {
        searchParams.push(`verbCase=${verbCase}`)
      }
      if (voice !== 'معروف') {
        searchParams.push(`voice=${voice}`)
      }
    }

    if (searchParams.length > 0) {
      route += `?${searchParams.join('&')}`
    }

    navigate(route, { replace: true })
  }, [mode, params])

  const toggleVoice = useCallback(() => {
    searchParams.set('voice', voice === 'معروف' ? 'مجهول' : 'معروف')
    setSearchParams(searchParams)
  }, [voice])

  const handleVerbCaseClick = useCallback(
    (newVervCase: string) => () => {
      if (newVervCase === verbCase) {
        searchParams.delete('verbCase')
      } else {
        searchParams.set('verbCase', newVervCase)
      }
      setSearchParams(searchParams)
    },
    [verbCase],
  )

  const goToFlashcards = useCallback(() => {
    if (isFlashcardMode) return

    let route = '/'

    if (params.type) {
      route += `${params.type}/`
    }

    if (params.form) {
      route += `${params.form}/`
    }

    route += 'flashcards'

    navigate(route, { replace: true })
  }, [isFlashcardMode, params])

  return (
    <div class="tasreef-toolbar">
      <div class="tasreef-toolbar-section">
        <ToolbarButton onClick={toggleMode}>{nextMode}</ToolbarButton>
      </div>

      {showVerbControls && (
        <div class="tasreef-toolbar-section">
          <ToolbarButton onClick={toggleVoice}>{voice}</ToolbarButton>

          <ToolbarDivider />

          {verbCases.map(($verbCase) => (
            <ToolbarButton
              key={$verbCase}
              active={$verbCase === verbCase}
              onClick={handleVerbCaseClick($verbCase)}
            >
              {$verbCase}
            </ToolbarButton>
          ))}
        </div>
      )}

      {(!isFlashcardMode || canReplaceRootLetters) && (
        <div class="tasreef-toolbar-section">
          {!isFlashcardMode && (
            <ToolbarButton onClick={goToFlashcards}>
              <Icon size="micro" name="flashcards" />
            </ToolbarButton>
          )}

          {canReplaceRootLetters && (
            <>
              <ToolbarDivider />

              <ToolbarButton onClick={openRootLettersModal}>
                <Icon size="micro" name="settings" />
              </ToolbarButton>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default TasreefToolbar

const ToolbarButton = ({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children: ComponentChildren
  onClick?: () => void
}) => {
  return (
    <div
      class={`tasreef-toolbar-section-button ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </div>
  )
}

const ToolbarDivider = () => (
  <div
    style={{
      width: 1,
      backgroundColor: 'var(--border)',
      margin: '6px 0',
    }}
  />
)
