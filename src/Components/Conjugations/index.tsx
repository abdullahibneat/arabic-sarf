import { useMemo, useState } from 'preact/hooks'
import { VerbTasreef } from '../../../data/types'
import './Conjugations.scss'
import useAppState from '../../Hooks/useAppState'

type Props = {
  heading: string
  tasreef: Partial<VerbTasreef>
  majhool?: Partial<VerbTasreef> | null
  audioSrc?: string
}

const Conjugations = ({ heading, tasreef, majhool, audioSrc }: Props) => {
  const [voice, setVoice] = useState<'معروف' | 'مجهول'>('معروف')

  const state = useAppState()

  const verb = useMemo(() => {
    if (voice === 'معروف') return tasreef
    return majhool
  }, [voice, tasreef, majhool])

  if (!verb) return <p>Verb not found</p>

  return (
    <div class="conjugationsContainer">
      <h2>{heading}</h2>

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

      {audioSrc && (
        <audio key={audioSrc} controls>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      <div class={`conjugations ${state.groupTasreefs ? 'grouped' : ''}`}>
        {verb['3rd'] && (
          <div>
            <div>
              <p data-number="1">{verb['3rd'].masculine['هُوَ']}</p>
              <p data-number="2">{verb['3rd'].masculine['هُمَا']}</p>
              <p data-number="3">{verb['3rd'].masculine['هُمْ']}</p>
            </div>
            <div>
              <p data-number="4">{verb['3rd'].feminine['هِيَ']}</p>
              <p data-number="5">{verb['3rd'].feminine['هُمَا']}</p>
              <p data-number="6">{verb['3rd'].feminine['هُنَّ']}</p>
            </div>
          </div>
        )}

        {verb['2nd'] && (
          <div>
            <div>
              <p data-number="7">{verb['2nd'].masculine['أَنْتَ']}</p>
              <p data-number="8">{verb['2nd'].masculine['أَنْتُمَا']}</p>
              <p data-number="9">{verb['2nd'].masculine['أَنْتُمْ']}</p>
            </div>
            <div>
              <p data-number="10">{verb['2nd'].feminine['أَنْتِ']}</p>
              <p data-number="11">{verb['2nd'].feminine['أَنْتُمَا']}</p>
              <p data-number="12">{verb['2nd'].feminine['أَنْتُنَّ']}</p>
            </div>
          </div>
        )}

        {verb['1st'] && (
          <div>
            <div>
              <p data-number="13">{verb['1st'].أَنَا}</p>
              <p data-number="14">{verb['1st'].نَحْنُ}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Conjugations
