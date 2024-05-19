const getNumberForPronoun = (pronoun: string) => {
  if (['هُوَ', 'هِيَ', 'أَنْتَ', 'أَنْتِ', 'أَنَا'].includes(pronoun))
    return `singular`

  if (['هُمَا', 'أَنْتُمَا'].includes(pronoun)) return `dual`

  return 'plural (3+)'
}

export default getNumberForPronoun
