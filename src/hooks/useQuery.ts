import { useCallback } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import useNavigate from './useNavigate'

const useQuery = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const get = useCallback(
    (key: string) => (key in location.query ? location.query[key] : undefined),
    [location.query],
  )

  const set = useCallback(
    (key: string, value: string) => {
      navigate(location.path, { ...location.query, [key]: String(value) })
    },
    [location.query, navigate],
  )

  return { query: location.query, get, set }
}

export default useQuery
