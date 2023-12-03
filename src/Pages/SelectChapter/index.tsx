import { useLocation, useRoute } from 'preact-iso'
import verbTypes from '../../../data'
import { useMemo, useCallback } from 'preact/hooks'
import asRomanNumeral from '../../Helpers/asRomanNumeral'
import Grid, { GridCell } from '../../Components/Grid'
import { ComponentChildren } from 'preact'
import { Page } from '../../Components'

const SelectChapter = () => {
  const location = useLocation()

  const { verbType } = useRoute().params

  const chapters = useMemo(() => verbTypes[verbType], [verbType])

  const mujarradVerbs = useMemo(() => {
    if (!chapters) return []

    return Object.keys(chapters['I']).map((chapter) => ({
      id: `I/${chapter}`,
      heading: chapter,
    }))
  }, [chapters])

  const mazidFih = useMemo(() => {
    if (!chapters) return []

    const cells: GridCell[] = []

    for (let chapterNumber = 2; chapterNumber <= 10; chapterNumber++) {
      const roman = asRomanNumeral(chapterNumber)

      if (roman === 'I') continue

      const chapter = chapters[roman]

      let heading = roman

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
      <div style={{ marginBottom: 32 }}>
        <H2>مجرّد</H2>
        <p style={{ marginBottom: 16 }}>
          A verb whose past tense هو sigha has no extra letters in it beyond the
          3 root letters
        </p>
        <Grid cells={mujarradVerbs} onCellClick={handleCellClick} />
      </div>

      <div>
        <H2>مزيد فِه</H2>
        <p style={{ marginBottom: 16 }}>
          A verb whose past tense هو sigha has extra letters in it beyond the 3
          root letters
        </p>
        <Grid cells={mazidFih} onCellClick={handleCellClick} />
      </div>
    </Page>
  )
}

export default SelectChapter

const H2 = ({ children }: { children: ComponentChildren }) => (
  <h2
    style={{
      fontFamily: 'var(--arabic)',
      fontSize: 32,
      fontWeight: '600',
    }}
  >
    {children}
  </h2>
)
