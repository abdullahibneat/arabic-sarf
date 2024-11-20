const toEnglishVerbType = (verbType: string) => {
  switch (verbType) {
    case 'صحيح':
      return 'sahih'
    case 'أجوف':
      return 'ajwaf'
    case 'ناقص':
      return 'naaqis'
    case 'مثال':
      return 'mithaal'
    case 'مضاعف':
      return 'mudaaf'
    default:
      return verbType
  }
}

export default toEnglishVerbType
