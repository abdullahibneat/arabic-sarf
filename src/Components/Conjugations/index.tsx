import { useCallback, useMemo, useState } from 'preact/hooks'
import { VerbTasreef } from '../../../data/types'
import './Conjugations.scss'
import useAppState from '../../Hooks/useAppState'

type Props = {
  heading: string
  tasreef: Partial<VerbTasreef>
  majhool?: Partial<VerbTasreef> | null
  meaning?: string
  audioSrc?: string
}

const Conjugations = ({
  heading,
  tasreef,
  majhool,
  meaning,
  audioSrc,
}: Props) => {
  const [voice, setVoice] = useState<'معروف' | 'مجهول'>('معروف')

  const [person, setPerson] = useState<{
    arabic: string
    english: string
  } | null>(null)

  const state = useAppState()

  const verb = useMemo(() => {
    if (voice === 'معروف') return tasreef
    return majhool
  }, [voice, tasreef, majhool])

  if (!verb) return <p>Verb not found</p>

  const handleClick = useCallback(
    (arabic: string, english: string) => () => {
      setPerson({ arabic, english })
    },
    [],
  )

  return (
    <>
      {person && (
        <div class="modal">
          <div>
            <p>Seegha: {person.arabic}</p>
            <p>Person: {person.english}</p>
            {meaning && (
              <p>
                Meaning: {person.english} {meaning}
              </p>
            )}
            <button onClick={() => setPerson(null)}>Close</button>
          </div>
        </div>
      )}

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
                <p onClick={handleClick('هُوَ', 'He')} data-number="1">
                  {verb['3rd'].masculine['هُوَ']}
                </p>
                <p
                  onClick={handleClick('هُمَا', 'They (2 male)')}
                  data-number="2"
                >
                  {verb['3rd'].masculine['هُمَا']}
                </p>
                <p
                  onClick={handleClick('هُمْ', 'They (3+ male)')}
                  data-number="3"
                >
                  {verb['3rd'].masculine['هُمْ']}
                </p>
              </div>
              <div>
                <p onClick={handleClick('هِيَ', 'She')} data-number="4">
                  {verb['3rd'].feminine['هِيَ']}
                </p>
                <p
                  onClick={handleClick('هُمَا', 'They (2 female)')}
                  data-number="5"
                >
                  {verb['3rd'].feminine['هُمَا']}
                </p>
                <p
                  onClick={handleClick('هُنَّ', 'They (3+ female)')}
                  data-number="6"
                >
                  {verb['3rd'].feminine['هُنَّ']}
                </p>
              </div>
            </div>
          )}

          {verb['2nd'] && (
            <div>
              <div>
                <p
                  onClick={handleClick('أَنْتَ', 'You (male)')}
                  data-number="7"
                >
                  {verb['2nd'].masculine['أَنْتَ']}
                </p>
                <p
                  onClick={handleClick('أَنْتُمَا', 'You (2 male)')}
                  data-number="8"
                >
                  {verb['2nd'].masculine['أَنْتُمَا']}
                </p>
                <p
                  onClick={handleClick('أَنْتُمْ', 'You (3+ male)')}
                  data-number="9"
                >
                  {verb['2nd'].masculine['أَنْتُمْ']}
                </p>
              </div>
              <div>
                <p
                  onClick={handleClick('أَنْتِ', 'You (female)')}
                  data-number="10"
                >
                  {verb['2nd'].feminine['أَنْتِ']}
                </p>
                <p
                  onClick={handleClick('أَنْتُمَا', 'You (2 female)')}
                  data-number="11"
                >
                  {verb['2nd'].feminine['أَنْتُمَا']}
                </p>
                <p
                  onClick={handleClick('أَنْتُنَّ', 'You (3+ female)')}
                  data-number="12"
                >
                  {verb['2nd'].feminine['أَنْتُنَّ']}
                </p>
              </div>
            </div>
          )}

          {verb['1st'] && (
            <div>
              <div>
                <p onClick={handleClick('أَنَا', 'I')} data-number="13">
                  {verb['1st'].أَنَا}
                </p>
                <p onClick={handleClick('نَحْنُ', 'We')} data-number="14">
                  {verb['1st'].نَحْنُ}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Conjugations
