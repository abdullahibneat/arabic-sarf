import { useEffect } from 'react'

const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: EventListener,
) => {
  useEffect(() => {
    const listener: EventListener = (event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export default useOnClickOutside
