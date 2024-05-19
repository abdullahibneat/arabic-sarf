const asDetailedEnglishPronoun = (pronoun: string, gender?: string) => {
  if (!gender) gender = 'masculine'

  if (['هُوَ', 'هِيَ'].includes(pronoun)) return `3rd person ${gender} singular`
  if (pronoun === 'هُمَا') return `3rd person ${gender} dual`
  if (['هُمْ', 'هُنَّ'].includes(pronoun)) return '3rd person masculine plural'

  if (['أَنْتَ', 'أَنْتِ'].includes(pronoun))
    return `2nd person ${gender} singular`
  if (pronoun === 'أَنْتُمَا') return `2nd person ${gender} dual`
  if (['أَنْتُمْ', 'أَنْتُنَّ'].includes(pronoun))
    return '2nd person masculine plural'

  return `1st person ${pronoun === 'أَنَا' ? 'singular' : 'plural'}`
}

export default asDetailedEnglishPronoun
