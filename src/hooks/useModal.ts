import { ModalContext } from '../contexts/ModalContext'
import { useContext } from 'preact/hooks'

const useModal = () => useContext(ModalContext)

export default useModal
