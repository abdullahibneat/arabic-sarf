import { JSX } from 'preact'
import './Modal.scss'

type Props = {
  open?: boolean
  children?: JSX.Element
  onClose?: () => void
}

const Modal = ({ open, children, onClose }: Props) =>
  open ? (
    <div class="modal">
      <div>
        {children}
        <button onClick={() => onClose?.()}>Close</button>
      </div>
    </div>
  ) : null

export default Modal
