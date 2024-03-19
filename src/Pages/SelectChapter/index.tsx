import { useLocation, useRoute } from 'preact-iso'
import verbTypes from '../../../data'
import { useMemo, useCallback } from 'preact/hooks'
import asRomanNumeral from '../../Helpers/asRomanNumeral'
import Grid, { GridCell } from '../../Components/Grid'
import { Page } from '../../Components'

const SelectChapter = () => {
  const location = useLocation()

  const { verbType } = useRoute().params

  const chapters = useMemo(() => verbTypes[verbType], [verbType])

  const mujarradVerbs = useMemo(() => {
    if (!chapters) return []

    return Object.keys(chapters['I']).map((chapter) => ({
      id: `I/${chapter}`,
      heading: `${chapters['I'][chapter].form} ${chapter}`,
    }))
  }, [chapters])

  const mazidFih = useMemo(() => {
    if (!chapters) return []

    const cells: GridCell[] = []

    for (let chapterNumber = 2; chapterNumber <= 10; chapterNumber++) {
      const roman = asRomanNumeral(chapterNumber)

      if (roman === 'I') continue

      const chapter = chapters[roman]

      let heading = String(chapterNumber)

      if (chapter) heading += ' ' + chapter.باب

      cells.push({
        id: roman,
        heading,
        disabled: !chapter,
      })
    }

    return cells
  }, [chapters])

  const handleCellClick = useCallback(
    ({ id }: { id: string }) => location.route(`${verbType}/${id}`),
    [verbType],
  )

  if (!chapters) {
    return <Page>Verb type not found</Page>
  }

  return (
    <Page>
      <Grid
        rtl
        cells={mujarradVerbs.concat(mazidFih)}
        onCellClick={handleCellClick}
      />
    </Page>
  )
}

export default SelectChapter
