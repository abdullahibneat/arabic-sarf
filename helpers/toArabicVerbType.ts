const toArabicVerbType = (verbType: string) => {
  switch (verbType) {
    case 'sahih':
      return 'صحيح'
    case 'ajwaf':
      return 'أجوف'
    case 'naaqis':
      return 'ناقص'
    case 'mithaal':
      return 'مثال'
    case 'mudaaf':
      return 'مضاعف'
    default:
      return verbType
  }
}

export default toArabicVerbType
