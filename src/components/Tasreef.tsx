import '../styles/Tasreef.scss'

import { VerbChapter, VerbConjugations } from '../../data/types'
import getSeeghas, { Seegha } from '../helpers/getSeeghas'
import { useCallback, useMemo } from 'preact/hooks'

import { AppStateType } from '../AppState'
import Flex from './Flex'
import IconButton from './IconButton'
import Text from './Text'
import getNumberForPronoun from '../helpers/getNumberForPronoun'
import replaceRoots from '../helpers/replaceRoots'
import useAppState from '../hooks/useAppState'
import useAudioPlayer from '../hooks/useAudioPlayer'
import useModal from '../hooks/useModal'

export type TasreefProps = {
  title: string
  particle?: string
  audioSrc?: string
  groupMode?: AppStateType['settings']['tasreefGroupMode']
  rootLetters: { ف: string; ع: string; ل: string }
  tense: keyof VerbConjugations
  baseChapter: VerbChapter
  voice?: string
  case: string
}

const Tasreef = ({
  title,
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

  const data: Seegha[][][] = useMemo(() => {
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

    const archetypeChapter = replaceRoots(baseChapter)
    const chapter = replaceRoots(baseChapter, rootLetters)
    const seeghas = getSeeghas({
      archetypeChapter,
      chapter,
      rootLetters,
      tense,
      voice,
      case: verbCase,
    })

    let index = 0

    return Object.entries(persons).map(([person, obj], personIndex) => {
      if (Array.isArray(obj)) {
        const pronouns = obj
        return [pronouns.map(() => seeghas[index++])]
      } else {
        return Object.entries(obj).map(([_, pronouns]) =>
          pronouns.map(() => seeghas[index++]),
        )
      }
    })
  }, [baseChapter, rootLetters, tense, voice, verbCase])

  const isEmpty = useMemo(() => {
    if (tense === 'ماضي' && verbCase !== 'مرفوع') return true

    const validSeeghas = data.flatMap((cells) =>
      cells.flatMap((seeghas) =>
        seeghas.filter((seegha) => seegha.conjugation),
      ),
    )

    return validSeeghas.length === 0
  }, [data])

  const openModal = useCallback(
    (cell: Seegha) => () => {
      const cellText = document.getSelection()
      if (cellText?.type === 'Range') return

      const {
        archetype: { ماضي, مضارع },
      } = replaceRoots(baseChapter)

      const pattern = `${ماضي.معروف} ${مضارع.معروف}`

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
              <li>Tasreef: {tense}</li>
              <li>Voice: {voice}</li>
              <li>Case: {verbCase}</li>
              <li>
                Pronoun: {cell.pronoun}
                <ul style={{ padding: 0, paddingLeft: 32 }}>
                  <li>Person: {cell.person}</li>
                  <li>Gender: {cell.gender || 'N/A'}</li>
                  <li>Number: {getNumberForPronoun(cell.pronoun)}</li>
                </ul>
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

      {isEmpty && (
        <div class="not-found">
          <Text color="text-secondary">N/A</Text>
        </div>
      )}

      {!isEmpty && (
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
