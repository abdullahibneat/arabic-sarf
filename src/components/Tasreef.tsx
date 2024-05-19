import '../styles/Tasreef.scss'

import { useCallback, useMemo } from 'preact/hooks'

import { AppStateType } from '../AppState'
import Flex from './Flex'
import IconButton from './IconButton'
import Text from './Text'
import { VerbTasreef } from '../../data/types'
import asDetailedEnglishPronoun from '../helpers/asDetailedEnglishPronoun'
import asEnglishPronoun from '../helpers/asEnglishPronoun'
import useAppState from '../hooks/useAppState'
import useAudioPlayer from '../hooks/useAudioPlayer'
import useModal from '../hooks/useModal'

export type TasreefProps = {
  title: string
  tasreef?: VerbTasreef | { '2nd': VerbTasreef['2nd'] } | null
  englishTasreef?: VerbTasreef | { '2nd': VerbTasreef['2nd'] } | null
  particle?: string
  audioSrc?: string
  groupMode?: AppStateType['settings']['tasreefGroupMode']
  type: string
  form: number
  rootLetters: { ف: string; ع: string; ل: string }
  binya: string
}

type CellData = {
  gender?: string
  person: string
  pronoun: string
  conjugation: string
  english: string
}

const Tasreef = ({
  title,
  tasreef,
  englishTasreef,
  particle,
  audioSrc,
  groupMode,
  type,
  form,
  rootLetters,
  binya,
}: TasreefProps) => {
  const { settings } = useAppState()

  const audioPlayer = useAudioPlayer()
  const modal = useModal()

  const prefix = useMemo(() => {
    if (!particle) return ''
    return particle + ' '
  }, [particle])

  const data: CellData[][][] = useMemo(() => {
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
          pronouns.map((pronoun) => ({
            person,
            pronoun,
            conjugation: String(tasreef?.[person]?.[pronoun] ?? ''),
            english: englishTasreef
              ? asEnglishPronoun(pronoun) +
                ' ' +
                String(englishTasreef?.[person]?.[pronoun])
              : '(not available for custom root letters)',
          })),
        ]
      } else {
        return Object.entries(obj).map(([gender, pronouns]) =>
          pronouns.map((pronoun) => ({
            gender,
            person,
            pronoun,
            conjugation: String(tasreef?.[person]?.[gender]?.[pronoun] ?? ''),
            english: englishTasreef
              ? asEnglishPronoun(pronoun) +
                ' ' +
                String(englishTasreef?.[person]?.[gender]?.[pronoun])
              : '(not available for custom root letters)',
          })),
        )
      }
    })
  }, [tasreef, englishTasreef])

  const openModal = useCallback(
    (cell: CellData) => () => {
      const cellText = document.getSelection()
      if (cellText?.type === 'Range') return

      modal.open({
        title: cell.conjugation,
        width: 'fit-content',
        children: (
          <Flex column padding="16px 24px" paddingLeft={24 + 16}>
            <ul style={{ padding: 0 }}>
              <li>Type: {type}</li>
              <li>Form: {form}</li>
              {rootLetters && (
                <li>
                  {`Root letters: ${rootLetters.ف} ${rootLetters.ع} ${rootLetters.ل}`}
                </li>
              )}
              <li>Binya: {binya}</li>
              <li>Seegha: {cell.pronoun}</li>
              <li>
                Pronoun: {asEnglishPronoun(cell.pronoun)} (
                {asDetailedEnglishPronoun(cell.pronoun, cell.gender)})
              </li>
              <li>Translation: {cell.english}</li>
            </ul>
          </Flex>
        ),
      })
    },
    [type, form, rootLetters, binya],
  )

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
                  {gender.map((cell, k) => (
                    <div
                      class={`cell ${cell.conjugation ? '' : 'disabled'}`}
                      key={String(k)}
                      onClick={cell.conjugation ? openModal(cell) : undefined}
                    >
                      <div class="seegha">
                        <p>
                          {prefix && <span>{prefix}</span>}
                          {cell.conjugation}
                        </p>
                      </div>
                      <div class="seegha-number" />
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
