// Fisher-Yates shuffle algorithm
// https://stackoverflow.com/a/25984542

const shuffle = <T>(a: T[]) => {
  let b: number,
    c = a.length,
    d: T
  while (c)
    (b = (Math.random() * c--) | 0), (d = a[c]), (a[c] = a[b]), (a[b] = d)
}

export default shuffle
