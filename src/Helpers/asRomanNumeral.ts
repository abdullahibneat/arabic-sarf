import { RomanNumeral } from '../../data/types'

const asRomanNumeral = (number: number): RomanNumeral => {
  switch (number) {
    case 1:
      return 'I'

    case 2:
      return 'II'

    case 3:
      return 'III'

    case 4:
      return 'IV'

    case 5:
      return 'V'

    case 6:
      return 'VI'

    case 7:
      return 'VII'

    case 8:
      return 'VIII'

    case 9:
      return 'IX'

    case 10:
    default:
      return 'X'
  }
}

export default asRomanNumeral
