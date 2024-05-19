import '../styles/Tasreef.scss'

import { VerbChapter, VerbTasreef } from '../../data/types'
import { useCallback, useMemo } from 'preact/hooks'

import { AppStateType } from '../AppState'
import Flex from './Flex'
import IconButton from './IconButton'
import Text from './Text'
import asDetailedEnglishPronoun from '../helpers/asDetailedEnglishPronoun'
import asEnglishPronoun from '../helpers/asEnglishPronoun'
import replace from '../helpers/replace'
import replaceRoots from '../helpers/replaceRoots'
import useAppState from '../hooks/useAppState'
import useAudioPlayer from '../hooks/useAudioPlayer'
import useModal from '../hooks/useModal'

export type TasreefProps = {
  title: string
  tasreef?: VerbTasreef | { '2nd': VerbTasreef['2nd'] } | null
  baseTasreef?: VerbTasreef | { '2nd': VerbTasreef['2nd'] } | null
  englishTasreef?: VerbTasreef | { '2nd': VerbTasreef['2nd'] } | null
  particle?: string
  audioSrc?: string
  groupMode?: AppStateType['settings']['tasreefGroupMode']
  rootLetters: { ف: string; ع: string; ل: string }
  tense: string
  baseChapter: VerbChapter
  voice: string
  case: string
}

type CellData = {
  gender?: string
  person: string
  pronoun: string
  conjugation: string
  archetype: string
  english: string
}

const Tasreef = ({
  title,
  tasreef,
  baseTasreef,
  englishTasreef,
  particle,
  audioSrc,
  groupMode,
  rootLetters,
  baseChapter,
  tense,
  voice,
  case: verbCase,
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

    const archetype = replace(
      baseTasreef || {},
      /[فعل]/g,
      baseChapter.root_letters[0].arabic,
    )

    return Object.entries(persons).map(([person, obj]) => {
      if (Array.isArray(obj)) {
        const pronouns = obj
        return [
          pronouns.map((pronoun) => ({
            person,
            pronoun,
            conjugation: String(tasreef?.[person]?.[pronoun] ?? ''),
            archetype: String(archetype?.[person]?.[pronoun] ?? ''),
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
            archetype: String(archetype?.[person]?.[gender]?.[pronoun] ?? ''),
            english: englishTasreef
              ? asEnglishPronoun(pronoun) +
                ' ' +
                String(englishTasreef?.[person]?.[gender]?.[pronoun])
              : '(not available for custom root letters)',
          })),
        )
      }
    })
  }, [tasreef, baseTasreef, baseChapter, englishTasreef])

  const openModal = useCallback(
    (cell: CellData) => () => {
      const cellText = document.getSelection()
      if (cellText?.type === 'Range') return

      const {
        archetype: { ماضي, مضارع, مصضر, فاعل, مفعول, أمر, نهي },
      } = replaceRoots(baseChapter)

      const pattern = `${ماضي.معروف} ${مضارع.معروف}`

      let sarfSagheer = [`${ماضي.معروف} ${مضارع.معروف} ${مصضر[0]} فهو ${فاعل}`]

      if (ماضي.مجهول && مضارع.مجهول && مفعول) {
        // majhool
        sarfSagheer.push(`و ${ماضي.مجهول} ${مضارع.مجهول} ${مصضر[0]} فهو
        ${مفعول}`)
      }

      sarfSagheer.push(`الأمر منه ${أمر} و النّهي عنه لا ${نهي}`)

      modal.open({
        title: cell.conjugation,
        width: 'fit-content',
        children: (
          <Flex column padding="16px 24px" paddingLeft={24 + 16}>
            <ul style={{ padding: 0 }}>
              {rootLetters && (
                <li>
                  {`Root letters: ${rootLetters.ف} ${rootLetters.ع} ${rootLetters.ل}`}
                </li>
              )}
              <li>Type: {baseChapter.type}</li>
              <li>Form: {baseChapter.form}</li>
              <li>Pattern: {pattern}</li>
              <li>
                Sarf sagheer:
                <ul style={{ padding: 0, paddingLeft: 32 }}>
                  {sarfSagheer.map((line, i) => (
                    <li key={`line-${i}`}>{line}</li>
                  ))}
                </ul>
              </li>
              <li>Tense: {tense}</li>
              <li>Voice: {voice}</li>
              <li>Case: {verbCase}</li>
              <li>
                Pronoun: {cell.pronoun} - (
                {asDetailedEnglishPronoun(cell.pronoun, cell.gender)})
              </li>
              <li>
                Archetype: {cell.conjugation} مثل {cell.archetype}
              </li>
              <li>Translation: {cell.english}</li>
            </ul>
          </Flex>
        ),
      })
    },
    [
      baseChapter.archetype,
      rootLetters,
      baseChapter.type,
      baseChapter.form,
      tense,
      voice,
      verbCase,
    ],
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
