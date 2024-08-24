import { useEffect, useState } from 'react'

const useMatchMedia = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => setMatches(media.matches)

    if (media.addListener) {
      media.addListener(listener)
    } else {
      media.addEventListener('change', listener)
    }

    return () => {
      if (media.removeListener) {
        media.removeListener(listener)
      } else {
        media.removeEventListener('change', listener)
      }
    }
  }, [query])

  return matches
}

export default useMatchMedia
