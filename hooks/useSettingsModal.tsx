import Modal from '@/components/Modal'
import Settings from '@/components/Settings'
import { useCallback } from 'react'
import useModals from './useModals'

const useSettingsModal = () => {
  const modals = useModals()

  const openSettings = useCallback(() => {
    modals.present({
      id: 'settings',
      content: (
        <Modal
          title="Settings"
          style={{ maxHeight: '80%', maxWidth: 500 }}
          onClose={() => modals.dismiss('settings')}
        >
          <Settings />
        </Modal>
      ),
    })
  }, [])

  return { openSettings }
}

export default useSettingsModal
