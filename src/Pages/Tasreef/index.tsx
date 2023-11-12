import { useRoute } from 'preact-iso'
import { useMemo } from 'preact/hooks'
import verbTypes from '../../../data'
import { RomanNumeral, VerbChapter } from '../../../data/types'
import { Conjugations, SarfSagheer } from '../../Components'
import { ComponentChildren } from 'preact'
import { replaceRoots } from '../../Helpers'
import './Tasreef.scss'

const Container = () => {
  const { verbType, verbForm, verbChapter } = useRoute().params

  const chapters = useMemo(() => verbTypes[verbType], [verbType])

  const baseForm = useMemo(() => {
    const chapterOrForm = chapters?.[verbForm as RomanNumeral]

    if (isChapter(chapterOrForm)) return chapterOrForm

    return chapterOrForm?.[verbChapter]
  }, [chapters, verbForm])

  const form = useMemo(() => {
    if (!baseForm) return null

    return replaceRoots(baseForm, {
      ف: baseForm.archetype.root_letters[0],
      ع: baseForm.archetype.root_letters[1],
      ل: baseForm.archetype.root_letters[2],
    })
  }, [baseForm])

  if (!form) {
    return <div>Form not found</div>
  }

  return (
    <div class="tasreefContainer">
      <H1>{form.باب}</H1>

      <SarfSagheer archetype={form.archetype} />

      <div class="sarfKabir">
        <div>
          <H2>ماضي</H2>
          <Conjugations tasreef={form.conjugations.ماضي.معروف} />
        </div>

        <div>
          <H2>مضارع</H2>
          <Conjugations tasreef={form.conjugations.مضارع.معروف} />
        </div>

        <div>
          <H2>نصب</H2>
          <Conjugations tasreef={form.conjugations.نصب} />
        </div>

        <div>
          <H2>جزم</H2>
          <Conjugations tasreef={form.conjugations.جزم} />
        </div>

        <div>
          <H2>أمر</H2>
          <Conjugations tasreef={form.conjugations.أمر} />
        </div>
      </div>
    </div>
  )
}

export default Container

const H1 = ({ children }: { children: ComponentChildren }) => (
  <h1
    style={{
      fontFamily: 'var(--arabic)',
      fontSize: 32,
      fontWeight: 600,
      textAlign: 'center',
    }}
  >
    {children}
  </h1>
)

const H2 = ({ children }: { children: ComponentChildren }) => (
  <h2
    style={{
      fontFamily: 'var(--arabic)',
      fontSize: 32,
      fontWeight: 600,
      textAlign: 'center',
    }}
  >
    {children}
  </h2>
)

const isChapter = (
  obj?: VerbChapter | Record<string, VerbChapter> | null,
): obj is VerbChapter => {
  return !!obj && 'باب' in obj
}
