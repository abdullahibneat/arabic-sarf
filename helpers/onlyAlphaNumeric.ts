const onlyAlphaNumeric = (string: string) =>
  string.replace(/[^0-9a-zA-Z\u0621-\u064A]/g, '')

export default onlyAlphaNumeric
