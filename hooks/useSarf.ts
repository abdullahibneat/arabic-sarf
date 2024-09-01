import { SarfContext } from '@/contexts/SarfProvider'
import { useContext } from 'react'

const useSarf = () => {
  const sarf = useContext(SarfContext)
  return sarf
}

export default useSarf
