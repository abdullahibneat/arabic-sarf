const asRomanNumeral = (number: number) => {
  if (number === 1) return 'I'
  if (number === 2) return 'II'
  if (number === 3) return 'III'
  if (number === 4) return 'IV'
  if (number === 5) return 'V'
  if (number === 6) return 'VI'
  if (number === 7) return 'VII'
  if (number === 8) return 'VIII'
  if (number === 9) return 'IX'
  if (number === 10) return 'X'
  return ''
}

export default asRomanNumeral
