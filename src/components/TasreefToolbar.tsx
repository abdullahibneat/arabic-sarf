import Flex from './Flex'
import IconButton from './IconButton'
import RootLettersEditorModal from './RootLettersEditorModal'
import Text from './Text'
import useAppState from '../hooks/useAppState'
import { useCallback } from 'preact/hooks'
import useChapterStateContext from '../hooks/useChapterState'
import useModal from '../hooks/useModal'

const TasreefToolbar = () => {
  const { chapter } = useChapterStateContext()

  const { settings } = useAppState()

  const modal = useModal()

  const openRootLettersModal = useCallback(() => {
    modal.open({
      title: 'Edit root letters',
      width: 400,
      children: <RootLettersEditorModal />,
    })
  }, [])

  if (!chapter) return null

  return (
    <Flex flex={1} justifyContent="center" alignItems="center" gap={8}>
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
  )
}

export default TasreefToolbar
