import IconButton from './IconButton'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { useRef } from 'react'

export type ModalProps = {
  title: string
  style?: React.CSSProperties
  children: React.ReactNode
  closeOnClickOutside?: boolean
  onClose?: () => void
}

const Modal = ({
  title,
  style,
  children,
  closeOnClickOutside = true,
  onClose,
}: ModalProps) => {
  const modal = useRef<HTMLDivElement>(null)

  useOnClickOutside(modal, () => {
    if (closeOnClickOutside) onClose?.()
  })

  return (
    <div
      ref={modal}
      className="flex h-full w-full flex-col rounded-lg bg-zinc-50 p-2 text-zinc-900 dark:bg-neutral-800 dark:text-neutral-100"
      style={style}
    >
      <div className="relative flex h-10 items-center gap-2 px-2">
        <h2 className="absolute inset-x-0 text-center">{title}</h2>
        <IconButton size="small" name="close" onClick={onClose} />
      </div>

      <div className="flex-1 overflow-auto p-2">{children}</div>
    </div>
  )
}

export default Modal
