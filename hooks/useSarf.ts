import { SarfContext } from '@/contexts/SarfContext'
import { useContext } from 'react'

const useSarf = () => {
  const sarf = useContext(SarfContext)
  return sarf
}

export default useSarf
