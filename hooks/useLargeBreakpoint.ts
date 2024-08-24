import useMatchMedia from './useMatchMedia'

const useLargeBreakpoint = () => {
  const isLg = useMatchMedia('(min-width: 1024px)')
  return isLg
}

export default useLargeBreakpoint
