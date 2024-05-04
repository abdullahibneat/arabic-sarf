import { useCallback } from 'preact/hooks'
import { useLocation } from 'preact-iso'

const useNavigate = () => {
  const location = useLocation()

  const navigate = useCallback(
    (path: string, query = location.query, replace = false) => {
      const qsParts: string[] = []

      for (const [key, value] of Object.entries(query)) {
        qsParts.push(`${key}=${value}`)
      }

      if (qsParts.length === 0) {
        location.route(path, replace)
      } else {
        location.route(path + '?' + qsParts.join('&'), replace)
      }
    },
    [location.query],
  )

  return navigate
}

export default useNavigate
