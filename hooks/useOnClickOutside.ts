import { useEffect } from 'react'

const useOnClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: EventListener,
) => {
  useEffect(() => {
    const listener: EventListener = (event) => {
      // Ignore clicks on child elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener('click', listener)

    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useOnClickOutside
