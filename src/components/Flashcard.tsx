import '../styles/Flashcard.scss'

import { useCallback, useEffect, useState } from 'preact/hooks'

import Flex from './Flex'
import { Seegha } from '../helpers/getSeeghas'
import Text from './Text'
import getNumberForPronoun from '../helpers/getNumberForPronoun'

type Props = {
  seegha: Seegha
}

const Flashcard = ({ seegha }: Props) => {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(false)
  }, [seegha])

  const flip = useCallback(() => {
    if (document.getSelection()?.type === 'Range') {
      // Highlighting text
      return
    }

    setFlipped((flipped) => !flipped)
  }, [])

  return (
    <div
      class={`flashcard-container ${flipped ? 'flipped' : ''}`}
      onClick={flip}
    >
      <div class="flashcard-front">
        <Text type="h2">{seegha.conjugation}</Text>

        <Text class="instruction" type="small" color="text-secondary">
          Click the card to flip it
        </Text>
      </div>

      <div class="flashcard-back">
        <Flex column padding="16px 24px" paddingLeft={24 + 16}>
          <ul style={{ padding: 0 }}>
            <li>
              {`Root letters: ${seegha.rootLetters.ف} ${seegha.rootLetters.ع} ${seegha.rootLetters.ل}`}
            </li>
            <li>Type: {seegha.type}</li>
            <li>Form: {seegha.form}</li>
            <li>Pattern: {seegha.pattern}</li>
            <li>Tasreef: {seegha.tasreef}</li>
            <li>Voice: {seegha.voice}</li>
            <li>Case: {seegha.case}</li>
            <li>
              Pronoun: {seegha.pronoun}
              <ul style={{ padding: 0, paddingLeft: 32 }}>
                <li>Person: {seegha.person}</li>
                <li>Gender: {seegha.gender || 'N/A'}</li>
                <li>Number: {getNumberForPronoun(seegha.pronoun)}</li>
              </ul>
            </li>
            <li>
              Archetype: {seegha.conjugation} مثل {seegha.archetype}
            </li>
            <li>Translation: {seegha.english}</li>
          </ul>
        </Flex>
      </div>
    </div>
  )
}

export default Flashcard
