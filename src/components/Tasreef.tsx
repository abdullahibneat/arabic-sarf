import '../styles/Tasreef.scss'

import { useCallback, useMemo } from 'preact/hooks'

import { AppStateType } from '../AppState'
import IconButton from './IconButton'
import Text from './Text'
import { VerbTasreef } from '../../data/types'
import useAppState from '../hooks/useAppState'
import useAudioPlayer from '../hooks/useAudioPlayer'

export type TasreefProps = {
  title: string
  tasreef?: VerbTasreef | { '2nd': VerbTasreef['2nd'] } | null
  particle?: string
  audioSrc?: string
  groupMode?: AppStateType['settings']['tasreefGroupMode']
}

const Tasreef = ({
  title,
  tasreef,
  particle,
  audioSrc,
  groupMode,
}: TasreefProps) => {
  const { settings, showEnglish } = useAppState()

  const audioPlayer = useAudioPlayer()

  const prefix = useMemo(() => (particle ? particle + ' ' : ''), [particle])

  const getPronoun = useCallback(
    (pronoun: string) => {
      if (!showEnglish) return ''

      if (pronoun === 'هُوَ') return 'he '
      if (pronoun === 'هِيَ') return 'she '
      if (['هُمَا', 'هُمْ', 'هُنَّ'].includes(pronoun)) return 'he '

      if (pronoun === 'أَنَا') return 'I '
      if (pronoun === 'نَحْنُ') return 'we '

      return 'you '
    },
    [showEnglish],
  )

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

    return Object.entries(persons).map(([person, obj]) => {
      if (Array.isArray(obj)) {
        const pronouns = obj
        return [
          pronouns.map(
            (pronoun) =>
              getPronoun(pronoun) + String(tasreef?.[person]?.[pronoun] ?? ''),
          ),
        ]
      } else {
        return Object.entries(obj).map(([gender, pronouns]) =>
          pronouns.map(
            (pronoun) =>
              getPronoun(pronoun) +
              String(tasreef?.[person]?.[gender]?.[pronoun] ?? ''),
          ),
        )
      }
    })
  }, [tasreef])

  let seeghaNumber = 0

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
                  {gender.map((seegha, k) => (
                    <div class="cell" key={String(k)}>
                      <div class="seegha">
                        <p>
                          {prefix && <span>{prefix}</span>}
                          {seegha}
                        </p>
                      </div>
                      <div class="seegha-number">{++seeghaNumber}</div>
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
