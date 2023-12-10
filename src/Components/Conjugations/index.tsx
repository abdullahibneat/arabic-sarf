import { useMemo, useState } from 'preact/hooks'
import { VerbTasreef } from '../../../data/types'
import './Conjugations.scss'

type Props = {
  tasreef: Partial<VerbTasreef>
  majhool?: Partial<VerbTasreef> | null
}

const Conjugations = ({ tasreef, majhool }: Props) => {
  const [voice, setVoice] = useState<'معروف' | 'مجهول'>('معروف')

  const verb = useMemo(() => {
    if (voice === 'معروف') return tasreef
    return majhool
  }, [voice, tasreef, majhool])

  if (!verb) return <p>Verb not found</p>

  return (
    <div class="conjugationsContainer">
      {majhool && (
        <div class="tabs">
          <button
            data-selected={voice === 'معروف'}
            onClick={() => setVoice('معروف')}
          >
            معروف
          </button>
          <button
            data-selected={voice === 'مجهول'}
            onClick={() => setVoice('مجهول')}
          >
            مجهول
          </button>
        </div>
      )}

      {verb['3rd'] && (
        <div class="person">
          <p>{verb['3rd'].feminine['هِيَ']}</p>
          <p>{verb['3rd'].masculine['هُوَ']}</p>
          <p>{verb['3rd'].feminine['هُمَا']}</p>
          <p>{verb['3rd'].masculine['هُمَا']}</p>
          <p>{verb['3rd'].feminine['هُنَّ']}</p>
          <p>{verb['3rd'].masculine['هُمْ']}</p>
        </div>
      )}

      {verb['2nd'] && (
        <div class="person">
          <p>{verb['2nd'].feminine['أَنْتِ']}</p>
          <p>{verb['2nd'].masculine['أَنْتَ']}</p>
          <p>{verb['2nd'].feminine['أَنْتُمَا']}</p>
          <p>{verb['2nd'].masculine['أَنْتُمَا']}</p>
          <p>{verb['2nd'].feminine['أَنْتُنَّ']}</p>
          <p>{verb['2nd'].masculine['أَنْتُمْ']}</p>
        </div>
      )}

      {verb['1st'] && (
        <div class="first person">
          <p>{verb['1st'].أَنَا}</p>
          <p>{verb['1st'].نَحْنُ}</p>
        </div>
      )}
    </div>
  )
}

export default Conjugations
