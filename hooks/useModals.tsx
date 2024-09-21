import { Modal, ModalContext } from '@/contexts/ModalContext'

import { useContext } from 'react'

const useModals = () => {
  const { modals, setModals } = useContext(ModalContext)

  const getDialog = (id: string) => {
    return document.querySelector<HTMLDialogElement>(`dialog#${id}`)
  }

  const present = (modal: Modal) => {
    setModals((modals) => modals.concat(modal))
    setTimeout(() => getDialog(modal.id)?.showModal(), 0)
    return () => dismiss(modal.id)
  }

  const dismiss = (id?: string) => {
    if (!id) {
      id = modals[modals.length - 1].id
    }

    const dialog = getDialog(id)

    if (dialog) {
      dialog.close()
      setModals((modals) => modals.filter((modal) => modal.id !== id))
    }
  }

  return { present, dismiss }
}

export default useModals
