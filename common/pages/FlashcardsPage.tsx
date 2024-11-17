'use client'

import { Chapter } from '@/helpers/getChapters'
import Flashcard from '@/components/Flashcard'
import PageTitle from '@/components/PageTitle'
import Swiper from '@/components/Swiper'
import generateFlashcards from '@/helpers/generateFlashcards'
import { useMemo } from 'react'
import useSarf from '@/hooks/useSarf'
import useVerbTypes from '@/hooks/useVerbTypes'

const FlashcardsPage = () => {
  const { verbType, verbChapter, rootLetters } = useSarf()

  const verbTypes = useVerbTypes()

  const chapters = useMemo(() => {
    const $chapters: Chapter[] = []

    for (const [type, chapters] of Object.entries(verbTypes)) {
      // If viewing a single verb type (e.g. صحيح), only show that type
      if (verbType && type !== verbType) continue
      if (verbChapter) {
        // If viewing a single chapter (e.g. نصر), only show that chapter
        const chapter = chapters.find(
          (chapter) => chapter.key === `${verbType}/${verbChapter}`,
        )
        if (chapter) $chapters.push(chapter)
      } else {
        // Otherwise, show all chapters for this verb type
        $chapters.push(...chapters)
      }
    }

    return $chapters
  }, [verbTypes, verbType, verbChapter])

  const flashcards = useMemo(
    () =>
      chapters.flatMap((chapter) => generateFlashcards(chapter, rootLetters)),
    [chapters, rootLetters],
  )

  return (
    <div className="flex h-full flex-col">
      <PageTitle>Flashcards</PageTitle>

      <Swiper
        className="flex flex-1 items-center justify-center gap-4 overflow-hidden p-4 pb-16"
        items={flashcards}
        renderItem={(ref, item, props, zIndex) => (
          <Flashcard
            ref={ref}
            {...props}
            animationDelay={Math.ceil((zIndex * 750) / flashcards.length)}
            term={
              <div className="flex flex-1 flex-col items-center justify-center">
                <h2>{item.term}</h2>
              </div>
            }
          >
            <div
              dir="ltr"
              className="flex flex-1 flex-col items-center justify-center"
            >
              <p>Root letters: {item.definition.rootLetters.join(', ')}</p>
              <p>Form: {item.definition.form}</p>
              <p>Binya: {item.definition.binya}</p>
              <p>Person: {item.definition.person}</p>
            </div>
          </Flashcard>
        )}
      />
    </div>
  )
}

export default FlashcardsPage
