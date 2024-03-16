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
              <p>{verb['3rd'].masculine['هُوَ']}</p>
              <p>{verb['3rd'].masculine['هُمَا']}</p>
              <p>{verb['3rd'].masculine['هُمْ']}</p>
            </div>
            <div>
              <p>{verb['3rd'].feminine['هِيَ']}</p>
              <p>{verb['3rd'].feminine['هُمَا']}</p>
              <p>{verb['3rd'].feminine['هُنَّ']}</p>
            </div>
          </div>
        )}

        {verb['2nd'] && (
          <div>
            <div>
              <p>{verb['2nd'].masculine['أَنْتَ']}</p>
              <p>{verb['2nd'].masculine['أَنْتُمَا']}</p>
              <p>{verb['2nd'].masculine['أَنْتُمْ']}</p>
            </div>
            <div>
              <p>{verb['2nd'].feminine['أَنْتِ']}</p>
              <p>{verb['2nd'].feminine['أَنْتُمَا']}</p>
              <p>{verb['2nd'].feminine['أَنْتُنَّ']}</p>
            </div>
          </div>
        )}

        {verb['1st'] && (
          <div>
            <div>
              <p>{verb['1st'].أَنَا}</p>
              <p>{verb['1st'].نَحْنُ}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Conjugations
