import '../styles/Popover.scss'

import { useEffect, useRef, useState } from 'preact/hooks'

import { ComponentChildren } from 'preact'

type Props = {
  children: ({ visible, setVisible }) => ComponentChildren
  content: ComponentChildren
}

const Popover = ({ children, content }: Props) => {
  const [visible, setVisible] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const captureClick = (event: MouseEvent) => {
      if (!ref.current) return
      if (!(event.target instanceof HTMLDivElement)) return
      if (ref.current.contains(event.target)) return

      setVisible(false)
    }

    window.document.addEventListener('click', captureClick)

    return () => window.document.removeEventListener('click', captureClick)
  }, [])

  return (
    <div class="popover-trigger">
      {children({ visible, setVisible })}

      {visible && (
        <div ref={ref} class="popover-wrapper">
          <div class="popover-content">{content}</div>
        </div>
      )}
    </div>
  )
}

export default Popover
