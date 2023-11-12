import { useLocation } from 'preact-iso'
import { useMemo, useCallback } from 'preact/hooks'
import { Grid } from '../Components'

const Home = () => {
  const location = useLocation()

  const verbTypes = useMemo(
    () => [
      {
        id: 'صحيح',
        heading: 'صحيح',
        description: 'A verb where none of the 3 root letters are weak',
      },
      {
        id: 'أجوف',
        heading: 'أجوف',
        description: 'A verb where the second of the 3 root letters is weak',
      },
      {
        id: 'ناقص',
        heading: 'ناقص',
        description: 'A verb where the third of the 3 root letters is weak',
      },
    ],
    [],
  )

  const handleCellClick = useCallback(
    ({ id }: { id: string }) => location.route(id),
    [],
  )

  return (
    <div style={{ height: 300 }}>
      <Grid cells={verbTypes} onCellClick={handleCellClick} />
    </div>
  )
}

export default Home
