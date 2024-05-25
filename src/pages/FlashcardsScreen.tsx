import '../styles/FlashcardsScreen.scss'

import getSeeghas, { Seegha } from '../helpers/getSeeghas'
import { useCallback, useMemo, useState } from 'preact/hooks'

import Flashcard from '../components/Flashcard'
import Flex from '../components/Flex'
import IconButton from '../components/IconButton'
import Segmented from '../components/Segmented'
import Text from '../components/Text'
import getChapters from '../helpers/getChapters'
import isMujarrad from '../helpers/isMujarrad'
import replaceRoots from '../helpers/replaceRoots'
import shuffle from '../helpers/shuffle'
import useAppState from '../hooks/useAppState'
import { useParams } from 'react-router-dom'
import verbTypes from '../../data'

const FlashcardsScreen = () => {
  const [index, setIndex] = useState(0)
  const [random, setRandom] = useState(false)
  const [archetypeMode, setArchetypeMode] = useState<
    'only' | 'exclude' | 'include'
  >('include')

  const { settings } = useAppState()

  const params = useParams()

  const chapters = useMemo(() => {
    const { type, form, chapter } = params

    if (!type) {
      return Object.values(verbTypes).flatMap(getChapters)
    }

    const typeData = verbTypes[type]

    if (!typeData) {
      return []
    }

    if (!form) {
      return getChapters(typeData)
    }

    const formData = typeData[form]

    if (!formData) return []

    if (!chapter) {
      return isMujarrad(formData) ? getChapters(formData) : [formData]
    }

    const chapterData = isMujarrad(formData) ? formData[chapter] : null

    return chapterData ? [chapterData] : []
  }, [params.type, params.form])

  const seeghas = useMemo(() => {
    const $seeghas: Seegha[] = []

    for (const baseChapter of chapters) {
      const archetypeChapter = replaceRoots(baseChapter)

      let exampleRootLetters = baseChapter.root_letters.map(
        (rootLetter) => rootLetter.arabic,
      )

      if (archetypeMode === 'only') {
        exampleRootLetters = [exampleRootLetters[0]]
      } else if (archetypeMode === 'exclude') {
        exampleRootLetters.shift()
      }

      for (const rootLetters of exampleRootLetters) {
        const chapter = replaceRoots(baseChapter, rootLetters)

        $seeghas.push(
          ...getSeeghas({
            archetypeChapter,
            chapter,
            rootLetters,
            tense: 'ماضي',
            voice: 'معروف',
            case: 'مرفوع',
          }),
        )

        if (settings.showMajhool)
          $seeghas.push(
            ...getSeeghas({
              archetypeChapter,
              chapter,
              rootLetters,
              tense: 'ماضي',
              voice: 'مجهول',
              case: 'مرفوع',
            }),
          )

        $seeghas.push(
          ...getSeeghas({
            archetypeChapter,
            chapter,
            rootLetters,
            tense: 'مضارع',
            voice: 'معروف',
            case: 'مرفوع',
          }),
        )
        if (settings.showMajhool)
          $seeghas.push(
            ...getSeeghas({
              archetypeChapter,
              chapter,
              rootLetters,
              tense: 'مضارع',
              voice: 'مجهول',
              case: 'مرفوع',
            }),
          )

        if (settings.showNasb) {
          $seeghas.push(
            ...getSeeghas({
              archetypeChapter,
              chapter,
              rootLetters,
              tense: 'نصب',
              voice: 'معروف',
              case: 'منصوب',
            }),
          )
          if (settings.showMajhool)
            $seeghas.push(
              ...getSeeghas({
                archetypeChapter,
                chapter,
                rootLetters,
                tense: 'نصب',
                voice: 'مجهول',
                case: 'منصوب',
              }),
            )
        }

        if (settings.showJazm) {
          $seeghas.push(
            ...getSeeghas({
              archetypeChapter,
              chapter,
              rootLetters,
              tense: 'جزم',
              voice: 'معروف',
              case: 'مجزوم',
            }),
          )
          if (settings.showMajhool)
            $seeghas.push(
              ...getSeeghas({
                archetypeChapter,
                chapter,
                rootLetters,
                tense: 'جزم',
                voice: 'مجهول',
                case: 'مجزوم',
              }),
            )
        }

        $seeghas.push(
          ...getSeeghas({
            archetypeChapter,
            chapter,
            rootLetters,
            tense: 'أمر',
            case: 'مجزوم',
          }),
        )
      }
    }

    return $seeghas.filter((seegha) => seegha.conjugation)
  }, [chapters, archetypeMode])

  const indexes = useMemo(() => {
    setIndex(0)
    const $indexes = seeghas.map((_, index) => index)
    if (random) shuffle($indexes)
    return $indexes
  }, [random, seeghas.length])

  const archetypeModeOptions = useMemo(
    () =>
      [
        { label: 'Only', value: 'only' },
        { label: 'Exclude', value: 'exclude' },
        { label: 'Include', value: 'include' },
      ] as const,
    [],
  )

  const seegha = useMemo(() => {
    const $seegha = seeghas[indexes[index]]
    if (!$seegha) return null
    return $seegha
  }, [seeghas, indexes, index])

  const previous = useCallback(() => {
    setIndex((index) => {
      if (index === 0) return seeghas.length - 1
      return index - 1
    })
  }, [seeghas.length])

  const next = useCallback(() => {
    setIndex((index) => {
      if (index === seeghas.length - 1) return 0
      return index + 1
    })
  }, [seeghas.length])

  return (
    <Flex column flex={1}>
      <Flex
        flex={1}
        gap={4}
        padding="16px"
        justifyContent="center"
        alignItems="center"
      >
        <IconButton size="micro" name="chevron-left" onClick={previous} />
        {seegha ? <Flashcard seegha={seegha} /> : <Text>Not found</Text>}
        <IconButton size="micro" name="chevron-right" onClick={next} />
      </Flex>

      <div class="flashcards-controls">
        <Flex gap={4} alignItems="center">
          <Text type="small">Archetypes:</Text>
          <Segmented
            value={archetypeMode}
            options={archetypeModeOptions}
            onChange={({ value }) => setArchetypeMode(value)}
          />
        </Flex>

        <IconButton
          name="repeat"
          active={random}
          onClick={() => setRandom(!random)}
        />
      </div>
    </Flex>
  )
}

export default FlashcardsScreen
