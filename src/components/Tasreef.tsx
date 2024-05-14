import '../styles/Tasreef.scss'

import { AppStateType } from '../AppState'
import IconButton from './IconButton'
import Text from './Text'
import { VerbTasreef } from '../../data/types'
import asEnglishPronoun from '../helpers/asEnglishPronoun'
import useAppState from '../hooks/useAppState'
import useAudioPlayer from '../hooks/useAudioPlayer'
import { useMemo } from 'preact/hooks'

export type TasreefProps = {
  title: string
  tasreef?: VerbTasreef | { '2nd': VerbTasreef['2nd'] } | null
  englishTasreef?: VerbTasreef | { '2nd': VerbTasreef['2nd'] } | null
  particle?: string
  audioSrc?: string
  groupMode?: AppStateType['settings']['tasreefGroupMode']
}

const Tasreef = ({
  title,
  tasreef,
  englishTasreef,
  particle,
  audioSrc,
  groupMode,
}: TasreefProps) => {
  const { settings, showEnglish } = useAppState()

  const audioPlayer = useAudioPlayer()

  const prefix = useMemo(() => {
    if (showEnglish) return ''
    if (!particle) return ''
    return particle + ' '
  }, [showEnglish, particle])

  const data = useMemo(() => {
    const persons = {
      '3rd': {
        masculine: ['هُوَ', 'هُمَا', 'هُمْ'],
        feminine: ['هِيَ', 'هُمَا', 'هُنَّ'],
      },
      '2nd': {
        masculine: ['أَنْتَ', 'أَنْتُمَا', 'أَنْتُمْ'],
        feminine: ['أَنْتِ', 'أَنْتُمَا', 'أَنْتُنَّ'],
      },
      '1st': ['أَنَا', 'نَحْنُ'],
    }

    let seeghaNumber = 0

    return Object.entries(persons).map(([person, obj]) => {
      if (Array.isArray(obj)) {
        const pronouns = obj
        return [
          pronouns.map((pronoun) => ({
            pronoun,
            seegha: String(tasreef?.[person]?.[pronoun] ?? ''),
            english: englishTasreef
              ? asEnglishPronoun(pronoun) +
                ' ' +
                String(englishTasreef?.[person]?.[pronoun])
              : '',
            seeghaNumber: ++seeghaNumber,
          })),
        ]
      } else {
        return Object.entries(obj).map(([gender, pronouns]) =>
          pronouns.map((pronoun) => ({
            pronoun,
            seegha: String(tasreef?.[person]?.[gender]?.[pronoun] ?? ''),
            english: englishTasreef
              ? asEnglishPronoun(pronoun) +
                ' ' +
                String(englishTasreef?.[person]?.[gender]?.[pronoun])
              : '',
            seeghaNumber: ++seeghaNumber,
          })),
        )
      }
    })
  }, [tasreef, englishTasreef])

  return (
    <div class={`tasreef ${groupMode || settings.tasreefGroupMode}`}>
      <div class="header cell">
        {audioSrc && (
          <div class="play">
            <IconButton
              size="micro"
              name="play"
              color="text-secondary"
              hoverColor="text"
              onClick={() => audioPlayer.setSrc(audioSrc)}
            />
          </div>
        )}
        <div>{title}</div>
      </div>

      {!tasreef && (
        <div class="not-found">
          <Text color="text-secondary">N/A</Text>
        </div>
      )}

      {tasreef && (
        <>
          {data.map((person, i) => (
            <div class="person" key={String(i)}>
              {person.map((gender, j) => (
                <div class="gender" key={String(j)}>
                  {gender.map(({ seegha, english, seeghaNumber }, k) => (
                    <div class="cell" key={String(k)} title={english}>
                      <div class="seegha">
                        <p>
                          {prefix && <span>{prefix}</span>}
                          {showEnglish ? english : seegha}
                        </p>
                      </div>
                      <div class="seegha-number">{seeghaNumber}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Tasreef
