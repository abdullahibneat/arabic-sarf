import { useLocation, useRoute } from 'preact-iso'
import './Navbar.scss'
import { useCallback, useMemo } from 'preact/hooks'
import verbTypes from '../../../data'
import { RomanNumeral, VerbChapter } from '../../../data/types'
import { replaceRoots } from '../../Helpers'
import useAppState from '../../Hooks/useAppState'
import AppState from '../../AppState'

const Navbar = () => {
  const { verbChapter, verbForm, verbType } = useRoute().params

  const location = useLocation()
  const state = useAppState()

  const goToHome = useCallback(() => location.route('/'), [])

  const chapters = useMemo(() => verbTypes[verbType], [verbType])

  const mujarradOptions = useMemo(() => {
    if (!chapters) return []
    return Object.keys(chapters['I']).map((chapter) => ({
      key: chapter,
      value: `I/${chapter}`,
    }))
  }, [chapters])

  const mazidFihOptions = useMemo(() => {
    if (!chapters) return []

    const options: Array<{ key: string; value: string }> = []

    for (const form of Object.keys(chapters)) {
      const $form = form as RomanNumeral
      if ($form === 'I') continue
      const baseForm = chapters[$form as RomanNumeral] as VerbChapter
      if (!baseForm) continue
      const chapter = replaceRoots(baseForm, {
        ف: baseForm.archetype.root_letters[0],
        ع: baseForm.archetype.root_letters[1],
        ل: baseForm.archetype.root_letters[2],
      })
      if (chapter)
        options.push({
          key: `${form} ${chapter.archetype.ماضي.معروف}`,
          value: form,
        })
    }

    return options
  }, [chapters])

  const goToVerbType = useCallback((event: { target: EventTarget | null }) => {
    if (!event.target) return
    if ('value' in event.target) location.route(`/${event.target.value}`)
  }, [])

  const goToChapter = useCallback((event: { target: EventTarget | null }) => {
    if (!event.target) return
    if ('value' in event.target)
      location.route(`/${verbType}/${event.target.value}`)
  }, [])

  const toggleViewMode = useCallback(() => {
    AppState.setItem('groupTasreefs', !state.groupTasreefs)
  }, [state.groupTasreefs])

  return (
    <div class="navbarContainer">
      <button onClick={goToHome}>Home</button>

      {verbType && (
        <>
          <span>&rsaquo;</span>

          <select value={verbType}>
            <option key={verbType} value={verbType}>
              {verbType}
            </option>
          </select>
        </>
      )}

      {verbForm && (
        <>
          <span>&rsaquo;</span>

          <select
            value={verbForm === 'I' ? `I/${verbChapter}` : verbForm}
            onChange={goToChapter}
          >
            <optgroup label="مجرّد">
              {mujarradOptions.map((chapter) => (
                <option key={chapter.key} value={chapter.value}>
                  {chapter.key}
                </option>
              ))}
            </optgroup>

            <optgroup label="مزيد فِه">
              {mazidFihOptions.map((chapter) => (
                <option key={chapter.key} value={chapter.value}>
                  {chapter.key}
                </option>
              ))}
            </optgroup>
          </select>

          <div style={{ flex: 1 }} />

          <select
            style={{ fontWeight: 'normal' }}
            value={state.groupTasreefs ? 1 : 0}
            onChange={(e) => {
              e.preventDefault()
              if (!!e.target && 'value' in e.target) {
                AppState.setItem('groupTasreefs', e.target.value === '1')
              }
            }}
          >
            <option value="0">List View</option>
            <option value="1">Grouped View</option>
          </select>
        </>
      )}
    </div>
  )
}

export default Navbar
