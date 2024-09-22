import { ModalContext } from '@/contexts/ModalContext'
import { useContext } from 'react'

const useModals = () => {
  const modals = useContext(ModalContext)
  return modals
}

export default useModals
