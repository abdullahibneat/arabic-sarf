import { useRoute } from 'preact-iso'
import { useMemo } from 'preact/hooks'
import verbTypes from '../../../data'
import { RomanNumeral } from '../../../data/types'
import { Conjugations, Page, SarfSagheer } from '../../Components'
import { ComponentChildren } from 'preact'
import { isChapter, replaceRoots } from '../../Helpers'
import './Tasreef.scss'

const Container = () => {
  const { verbType, verbForm, verbChapter } = useRoute().params

  const chapters = useMemo(() => verbTypes[verbType], [verbType])

  const baseForm = useMemo(() => {
    const chapterOrForm = chapters?.[verbForm as RomanNumeral]

    if (isChapter(chapterOrForm)) return chapterOrForm

    return chapterOrForm?.[verbChapter]
  }, [chapters, verbForm, verbChapter])

  const form = useMemo(() => {
    if (!baseForm) return null

    return replaceRoots(baseForm, {
      ف: baseForm.archetype.root_letters[0],
      ع: baseForm.archetype.root_letters[1],
      ل: baseForm.archetype.root_letters[2],
    })
  }, [baseForm])

  if (!form) {
    return <Page>Form not found</Page>
  }

  return (
    <Page
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 64,
        paddingTop: 32,
      }}
    >
      <H1>{`${form.archetype.ماضي.معروف} ${form.archetype.مضارع.معروف} ${verbForm}`}</H1>

      <SarfSagheer archetype={form.archetype} />

      <div class="sarfKabir">
        <div>
          <Conjugations
            heading="ماضي"
            tasreef={form.conjugations.ماضي.معروف}
            majhool={form.conjugations.ماضي.مجهول}
          />
        </div>

        <div>
          <Conjugations
            heading="مضارع"
            tasreef={form.conjugations.مضارع.معروف}
            majhool={form.conjugations.مضارع.مجهول}
          />
        </div>

        <div>
          <Conjugations heading="نصب" tasreef={form.conjugations.نصب} />
        </div>

        <div>
          <Conjugations heading="جزم" tasreef={form.conjugations.جزم} />
        </div>

        <div>
          <Conjugations heading="أمر" tasreef={form.conjugations.أمر} />
        </div>
      </div>
    </Page>
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
