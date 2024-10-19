import replaceRoots from '@/helpers/replaceRoots'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import verbTypes from '@/data'

const useHead = () => {
  const { type: verbType, chapter: verbChapter } = useRouter().query

  const chapter = useMemo(() => {
    if (!verbType) return null
    const chapters = verbTypes.get(String(verbType))
    if (!chapters) return null
    const chapter = chapters.get(String(verbChapter))
    if (!chapter) return null
    return replaceRoots(chapter, chapter.root_letters[0].arabic)
  }, [verbTypes, verbType, verbChapter])

  const title = useMemo(() => {
    let titleSegments = ['Sarf - Arabic Verb Conjugations']
    if (verbType) titleSegments.push(String(verbType))
    if (chapter) titleSegments.push(chapter.title)
    return titleSegments.join(' - ').replace(' - ', ' | ')
  }, [verbType, chapter])

  const description = useMemo(() => {
    const fallback = `Explore an extensive collection of Arabic Sarf (Morphology) conjugations and rules. Learn Arabic verbs through tasreefs and practice chapters like nasara, daraba, and more.`

    if (chapter) {
      switch (chapter.form) {
        case 1:
          const verbTypeDescription = verbTypeDescriptions[chapter.type]
          if (!verbTypeDescription) return fallback
          return `${verbTypeDescription.text}, like ${chapter.title}`
        case 2:
          return `Form II (2) verbs, also known as "baab taf'eel" (باب تَفْعِيْل), are characterized by a shadda (doubling) on the second root letter, like ${chapter.title}`
        case 3:
          return `Form III (3) verbs, known as "baab mufaa'ala" (باب مُفَاعَلَة), are distinguished by the addition of a stretch the first and second root letters, like ${chapter.title}`
        case 4:
          return `Form IV (4) verbs, referred to as "baab if'aal" (باب إِفْعَال), are marked by the addition of a hamza (أ) at the beginning of the verb in the past tense (ماضي), like ${chapter.title}`
        case 5:
          return `Form V (5) verbs, also known as "baab tafa'ul" (باب تَفَعُّل), feature a shadda (doubling) on the second root letter and begin with a "ta" prefix (تَ) in the past tense (ماضي), like ${chapter.title}`
        case 6:
          return `Form VI (6) verbs, known as "baab tafaaul" (باب تَفَاعُل), start with a "ta" prefix (تَ) in the past tense (ماضي) and include a stretch after the first root letter, like ${chapter.title}`
        case 7:
          return `Form VII (7) verbs, referred to as "baab infiaal" (باب انْفِعَال), begin with the prefix "in" (اِنْ) in the past tense (ماضي), like ${chapter.title}`
        case 8:
          return `Form VIII (8) verbs, known as "baab iftiaal" (باب افْتِعَال), are characterized by the presence of a "ta" prefix (تَ) after the first root letter, like ${chapter.title}`
        case 9:
          return `Form IX (9) verbs, referred to as "baab ifilaal" (باب افْعِلَال), feature a doubling of the last root letter, like ${chapter.title}`
        case 10:
          return `Form X (10) verbs, also known as "baab istif'aal" (باب اسْتِفْعَال), begin with the prefix "ist" (اِسْتَ) in the past tense (ماضي), like ${chapter.title}`
      }
    } else if (verbType) {
      const verbTypeDescription = verbTypeDescriptions[String(verbType)]
      if (!verbTypeDescription) return fallback
      return `${verbTypeDescription.text}, like ${verbTypeDescription.example}`
    }

    return fallback
  }, [chapter, verbType])

  const image = useMemo(() => {
    let title = 'Sarf - Arabic Verb Conjugations'
    if (chapter) {
      title = chapter.title
    } else if (verbType) {
      title = String(verbType)
    }
    // TODO - Cusotm image generation: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-image-generation
    return `https://og.tailgraph.com/og?title=${encodeURI(title)}&titleTailwind=text-gray-900%20font-bold%20text-6xl&titleFontFamily=Noto%20Sans%20Arabic&bgTailwind=bg-white`
  }, [chapter, verbType])

  return { title, description, image }
}

export default useHead

const verbTypeDescriptions: Record<
  string,
  { text: string; example: string } | undefined
> = {
  صحيح: {
    text: `Sahih (صحيح) verbs are those verbs that contain no weak letters (و, ي, أ) in their root letters`,
    example: `نَصَرَ يَنْصُرُ`,
  },
  أجوف: {
    text: `Ajwaf (أجوف) verbs have a weak letter (either و or ي) as the middle root letters`,
    example: `قَالَ يَقُوْلُ`,
  },
  ناقِص: {
    text: `Naqis (ناقِص) verbs contain a weak letter (either و or ي) as the third root letter`,
    example: `دَعَا يَدْعُوْ`,
  },
  مثال: {
    text: `Mithaal (مثال) verbs have a weak letter (either و or ي) as the first root letter`,
    example: `وَجَدَ يَجِدُ`,
  },
  مضاعف: {
    text: `Muda'af (مضاعف) verbs are characterized by a doubling of one of the root letters`,
    example: `مَدَّ يَمُدُّ`,
  },
}
