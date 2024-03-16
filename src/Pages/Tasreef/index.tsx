import { useRoute } from 'preact-iso'
import { useMemo, useState } from 'preact/hooks'
import verbTypes from '../../../data'
import { RomanNumeral, VerbChapter } from '../../../data/types'
import {
  Conjugations,
  Page,
  RootLettersEditor,
  SarfSagheer,
} from '../../Components'
import { ComponentChildren } from 'preact'
import { isChapter, replaceRoots } from '../../Helpers'
import './Tasreef.scss'

const Container = () => {
  const { verbType, verbForm, verbChapter } = useRoute().params

  const [rootLetters, setRootLetters] = useState({ ف: 'ف', ع: 'ع', ل: 'ل' })

  const chapters = useMemo(() => verbTypes[verbType], [verbType])

  const baseForm = useMemo(() => {
    const chapterOrForm = chapters?.[verbForm as RomanNumeral]

    let $baseForm: VerbChapter | undefined = undefined

    if (isChapter(chapterOrForm)) {
      $baseForm = chapterOrForm
    } else {
      $baseForm = chapterOrForm?.[verbChapter]
    }

    if ($baseForm) {
      setRootLetters({
        ف: $baseForm.archetype.root_letters[0],
        ع: $baseForm.archetype.root_letters[1],
        ل: $baseForm.archetype.root_letters[2],
      })
    }

    return $baseForm
  }, [chapters, verbForm, verbChapter])

  const form = useMemo(() => {
    if (!baseForm) return null
    return replaceRoots(baseForm, rootLetters)
  }, [baseForm, rootLetters])

  const placeholder = useMemo(() => {
    if (baseForm)
      return {
        ف: baseForm.archetype.root_letters[0],
        ع: baseForm.archetype.root_letters[1],
        ل: baseForm.archetype.root_letters[2],
      }

    return undefined
  }, [baseForm])

  const audioPath = useMemo(() => {
    let path = `/recordings/${verbType}/${verbForm}`
    const chapterOrForm = chapters?.[verbForm as RomanNumeral]
    if (!isChapter(chapterOrForm)) {
      path += `/${verbChapter}`
    }
    return path
  }, [verbType, verbForm, chapters, verbChapter])

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
      {/* <div class="rootLettersEditor">
        <RootLettersEditor
          ajwaf={verbType === 'أجوف'}
          naqis={verbType === 'ناقص'}
          placeholder={placeholder}
          rootLetters={rootLetters}
          onChange={setRootLetters}
        />
      </div> */}

      <H1>{`${form.archetype.ماضي.معروف} ${form.archetype.مضارع.معروف} ${form.form}`}</H1>

      {/* <SarfSagheer archetype={form.archetype} /> */}

      <div class="sarfKabir">
        <div>
          <Conjugations
            heading="ماضي"
            tasreef={form.conjugations.ماضي.معروف}
            audioSrc={audioPath + '/ماضي.mp3'}
            // majhool={form.conjugations.ماضي.مجهول}
          />
        </div>

        <div>
          <Conjugations
            heading="مضارع"
            tasreef={form.conjugations.مضارع.معروف}
            audioSrc={audioPath + '/مضارع.mp3'}
            // majhool={form.conjugations.مضارع.مجهول}
          />
        </div>

        {/* <div>
          <Conjugations heading="نصب" tasreef={form.conjugations.نصب} />
        </div> */}

        {/* <div>
          <Conjugations heading="جزم" tasreef={form.conjugations.جزم} />
        </div> */}

        <div>
          <Conjugations
            heading="أمر"
            tasreef={form.conjugations.أمر}
            audioSrc={audioPath + '/أمر.mp3'}
          />
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
      direction: 'rtl',
    }}
  >
    {children}
  </h1>
)
