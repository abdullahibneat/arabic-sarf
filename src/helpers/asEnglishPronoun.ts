const asEnglishPronoun = (pronoun: string) => {
  if (pronoun === 'هُوَ') return 'he'
  if (pronoun === 'هِيَ') return 'she'

  if (['هُمَا', 'هُمْ', 'هُنَّ'].includes(pronoun)) return 'they'

  if (pronoun === 'أَنَا') return 'I'
  if (pronoun === 'نَحْنُ') return 'we'

  return 'you'
}

export default asEnglishPronoun
