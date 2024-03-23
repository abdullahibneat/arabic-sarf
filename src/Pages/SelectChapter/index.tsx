import { useLocation, useRoute } from 'preact-iso'
import verbTypes from '../../../data'
import { useMemo, useCallback } from 'preact/hooks'
import asRomanNumeral from '../../Helpers/asRomanNumeral'
import Grid, { GridCell } from '../../Components/Grid'
import { Page } from '../../Components'
import { replaceRoots } from '../../Helpers'

const SelectChapter = () => {
  const location = useLocation()

  const { verbType = 'صحيح' } = useRoute().params

  const chapters = useMemo(() => verbTypes[verbType], [verbType])

  const mujarradVerbs = useMemo(() => {
    if (!chapters) return []

    const verbs: GridCell[] = []

    for (const chapter of Object.keys(chapters['I'])) {
      let $chapter = chapters['I'][chapter]
      $chapter = replaceRoots($chapter, {
        ف: $chapter.archetype.root_letters[0],
        ع: $chapter.archetype.root_letters[1],
        ل: $chapter.archetype.root_letters[2],
      })

      verbs.push({
        id: `I/${chapter}`,
        pre: String($chapter.form),
        heading: `${$chapter.archetype.ماضي.معروف} ${$chapter.archetype.مضارع.معروف}`,
      })
    }

    return verbs
  }, [chapters])

  const mazidFih = useMemo(() => {
    if (!chapters) return []

    const cells: GridCell[] = []

    for (let chapterNumber = 2; chapterNumber <= 10; chapterNumber++) {
      const roman = asRomanNumeral(chapterNumber)

      if (roman === 'I') continue

      let chapter = chapters[roman]

      let heading = String(chapterNumber)

      if (chapter) {
        chapter = replaceRoots(chapter, {
          ف: chapter.archetype.root_letters[0],
          ع: chapter.archetype.root_letters[1],
          ل: chapter.archetype.root_letters[2],
        })
        heading = `${chapter.archetype.ماضي.معروف} ${chapter.archetype.مضارع.معروف}`
      }

      cells.push({
        id: roman,
        pre: String(chapter?.form),
        heading,
        disabled: !chapter,
      })
    }

    return cells
  }, [chapters])

  const handleCellClick = useCallback(
    ({ id }: { id: string }) => location.route(id),
    [verbType],
  )

  if (!chapters) {
    return <Page>Verb type not found</Page>
  }

  return (
    <Page style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
      <Grid rtl cells={mujarradVerbs} onCellClick={handleCellClick} />
      <Grid rtl cells={mazidFih} onCellClick={handleCellClick} />
    </Page>
  )
}

export default SelectChapter
