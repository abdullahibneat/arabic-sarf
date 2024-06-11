import { useCallback, useMemo } from 'preact/hooks'

import Flex from './Flex'
import IconButton from './IconButton'
import RootLettersEditorModal from './RootLettersEditorModal'
import Segmented from './Segmented'
import Text from './Text'
import useAppState from '../hooks/useAppState'
import useChapterStateContext from '../hooks/useChapterState'
import useModal from '../hooks/useModal'
import { useSearchParams } from 'react-router-dom'

const TasreefToolbar = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { chapter } = useChapterStateContext()

  const { settings } = useAppState()

  const modal = useModal()

  const verbCase = searchParams.get('verbCase') || 'مرفوع'
  const voice = searchParams.get('voice')

  const showVerbTasreefs = useMemo(
    () => voice === 'معروف' || voice === 'مجهول',
    [voice],
  )

  const verbCases = useMemo(() => {
    const $verbCases = ['مرفوع']

    if (settings.showNasb) $verbCases.push('منصوب')
    if (settings.showJazm) $verbCases.push('مجزوم')

    return $verbCases.reverse()
  }, [settings.showNasb, settings.showJazm])

  const openRootLettersModal = useCallback(() => {
    modal.open({
      title: 'Edit root letters',
      width: 400,
      children: <RootLettersEditorModal />,
    })
  }, [])

  return (
    <Flex flex={1} alignItems="center">
      <Flex flex={1} justifyContent="center">
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

      {chapter && (
        <Flex flex={1} gap={8} justifyContent="center">
          <Text type="bold">{chapter.title}</Text>

          {settings.showRootLettersEditor && (
            <div class="collapse-icon">
              <IconButton
                size="micro"
                name="chevron-down"
                onClick={openRootLettersModal}
              />
            </div>
          )}
        </Flex>
      )}
    </Flex>
  )
}

export default TasreefToolbar
