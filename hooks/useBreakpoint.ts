import tailwindConfig from '@/tailwind.config'
import useMatchMedia from './useMatchMedia'

const useBreakpoint = (size: keyof typeof tailwindConfig.theme.screens) => {
  const matches = useMatchMedia(
    `(min-width: ${tailwindConfig.theme.screens[size]})`,
  )

  return matches
}

export default useBreakpoint
