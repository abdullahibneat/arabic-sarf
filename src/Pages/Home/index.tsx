import { Grid, Page } from '../../Components'
import { useCallback, useMemo } from 'preact/hooks'

import { useLocation } from 'preact-iso'

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
      {
        id: 'مثال',
        heading: 'مثال',
        description: 'A verb where the first of the 3 root letters is weak',
      },
      {
        id: 'مضاعف',
        heading: 'مضاعف',
        description: 'A verb where the root letters are doubled',
      },
    ],
    [],
  )

  const handleCellClick = useCallback(
    ({ id }: { id: string }) => location.route(id),
    [],
  )

  return (
    <Page style={{ height: 300 }}>
      <Grid cells={verbTypes} onCellClick={handleCellClick} />
    </Page>
  )
}

export default Home
