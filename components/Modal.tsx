import IconButton from './IconButton'

export type ModalProps = {
  title: string
  style?: React.CSSProperties
  children: React.ReactNode
  onClose?: () => void
}

const Modal = ({ title, style, children, onClose }: ModalProps) => {
  return (
    <div
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
