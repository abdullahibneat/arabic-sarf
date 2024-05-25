import { EnglishVerb, VerbConjugations } from '../../data/types'

const generateEnglishConjugations = (verb: EnglishVerb): VerbConjugations => {
  if (typeof verb === 'string') {
    verb = { base: verb }
  }

  if (!verb.past) {
    verb.past = generatePastTense(verb)
  }

  if (!verb.presentContinuous) {
    verb.presentContinuous = generatePresentContinuousTense(verb)
  }

  if (!verb.passive) {
    verb.passive = generatePassiveTense(verb)
  }

  /**
   * E.g. to give <sincere advice>
   *
   * Sometimes passive verbs need to be adjusted
   * e.g. he made <s.o. understand> => was was made <to understand>
   */
  if (verb.specifically) {
    if (typeof verb.specifically === 'string') {
      verb.specifically = {
        base: verb.specifically,
        passive: verb.specifically,
      }
    }

    verb.base += ' ' + verb.specifically.base
    verb.past += ' ' + verb.specifically.base
    verb.presentContinuous += ' ' + verb.specifically.base
    verb.passive += ' ' + verb.specifically.passive
  }

  return {
    ماضي: {
      معروف: generateMadiMaroofTasreef(verb),
      مجهول: generateMadiMajhoolTasreef(verb),
    },
    مضارع: {
      معروف: generateMudariMaroofTasreef(verb),
      مجهول: generateMudariMajhoolTasreef(verb),
    },
    نصب: {
      معروف: generateNasbMaroofTasreef(verb),
      مجهول: generateNasbMajhoolTasreef(verb),
    },
    جزم: {
      معروف: generateJazmMaroofTasreef(verb),
      مجهول: generateJazmMajhoolTasreef(verb),
    },
    أمر: generateAmrTasreef(verb),
  }
}

export default generateEnglishConjugations

const generatePastTense = (verb: { base: string; prefixToBe?: boolean }) => {
  if (verb.prefixToBe) {
    // E.g. noble => (he was) noble, no need to append -ed
    return verb.base
  }

  let past = verb.base + 'ed'

  if (verb.base.endsWith('e')) {
    // E.g. recite => recited, not reciteed
    past = verb.base + 'd'
  }

  if (verb.base.endsWith('y')) {
    const secondToLastLetter = verb.base[verb.base.length - 2]

    if (isConsonant(secondToLastLetter)) {
      // E.g. cry => cried, but not play => plaied
      const verbWithoutLastLetter = verb.base.substring(0, verb.base.length - 1)
      past = verbWithoutLastLetter + 'ied'
    }
  }

  return past
}

const isConsonant = (letter: string) =>
  !['a', 'e', 'i', 'o', 'u'].includes(letter)

const generatePresentContinuousTense = (verb: {
  base: string
  prefixToBe?: boolean
}) => {
  if (verb.prefixToBe) {
    // E.g. noble => (he is) noble, no need to append -ing
    return verb.base
  }

  let presentContinuous = verb.base + 'ing'

  if (verb.base.endsWith('e') && !verb.base.endsWith('ee')) {
    // E.g. like => liking, but not agree => agreing
    const verbWithoutLastLetter = verb.base.substring(0, verb.base.length - 1)
    presentContinuous = verbWithoutLastLetter + 'ing'
  }

  return presentContinuous
}

const generatePassiveTense = (verb: {
  base: string
  past?: string
  prefixToBe?: boolean
}) => {
  if (verb.prefixToBe) {
    // E.g. noble => (he was) made noble
    return 'made ' + verb.past
  }

  // E.g. help => past tense is `helped` => (he was) helped
  return verb.past
}

const generateMadiMaroofTasreef = (verb: {
  past?: string
  prefixToBe?: boolean
}): VerbConjugations['ماضي']['معروف'] => ({
  '3rd': {
    masculine: {
      هُوَ: [verb.prefixToBe ? 'was' : '', verb.past].join(' '),
      هُمَا: [verb.prefixToBe ? 'were' : '', verb.past].join(' '),
      هُمْ: [verb.prefixToBe ? 'were' : '', verb.past].join(' '),
    },
    feminine: {
      هِيَ: [verb.prefixToBe ? 'was' : '', verb.past].join(' '),
      هُمَا: [verb.prefixToBe ? 'were' : '', verb.past].join(' '),
      هُنَّ: [verb.prefixToBe ? 'were' : '', verb.past].join(' '),
    },
  },
  '2nd': {
    masculine: {
      أَنْتَ: [verb.prefixToBe ? 'were' : '', verb.past].join(' '),
      أَنْتُمَا: [verb.prefixToBe ? 'were' : '', verb.past].join(' '),
      أَنْتُمْ: [verb.prefixToBe ? 'were' : '', verb.past].join(' '),
    },
    feminine: {
      أَنْتِ: [verb.prefixToBe ? 'were' : '', verb.past].join(' '),
      أَنْتُمَا: [verb.prefixToBe ? 'were' : '', verb.past].join(' '),
      أَنْتُنَّ: [verb.prefixToBe ? 'were' : '', verb.past].join(' '),
    },
  },
  '1st': {
    أَنَا: [verb.prefixToBe ? 'was' : '', verb.past].join(' '),
    نَحْنُ: [verb.prefixToBe ? 'were' : '', verb.past].join(' '),
  },
})

const generateMadiMajhoolTasreef = (verb: {
  passive?: string
}): VerbConjugations['ماضي']['مجهول'] => ({
  '3rd': {
    masculine: {
      هُوَ: ['was', verb.passive].join(' '),
      هُمَا: ['were', verb.passive].join(' '),
      هُمْ: ['were', verb.passive].join(' '),
    },
    feminine: {
      هِيَ: ['was', verb.passive].join(' '),
      هُمَا: ['were', verb.passive].join(' '),
      هُنَّ: ['were', verb.passive].join(' '),
    },
  },
  '2nd': {
    masculine: {
      أَنْتَ: ['were', verb.passive].join(' '),
      أَنْتُمَا: ['were', verb.passive].join(' '),
      أَنْتُمْ: ['were', verb.passive].join(' '),
    },
    feminine: {
      أَنْتِ: ['were', verb.passive].join(' '),
      أَنْتُمَا: ['were', verb.passive].join(' '),
      أَنْتُنَّ: ['were', verb.passive].join(' '),
    },
  },
  '1st': {
    أَنَا: ['was', verb.passive].join(' '),
    نَحْنُ: ['were', verb.passive].join(' '),
  },
})

const generateMudariMaroofTasreef = (verb: {
  presentContinuous?: string
}): VerbConjugations['مضارع']['معروف'] => ({
  '3rd': {
    masculine: {
      هُوَ: ['is', verb.presentContinuous].join(' '),
      هُمَا: ['are', verb.presentContinuous].join(' '),
      هُمْ: ['are', verb.presentContinuous].join(' '),
    },
    feminine: {
      هِيَ: ['is', verb.presentContinuous].join(' '),
      هُمَا: ['are', verb.presentContinuous].join(' '),
      هُنَّ: ['are', verb.presentContinuous].join(' '),
    },
  },
  '2nd': {
    masculine: {
      أَنْتَ: ['are', verb.presentContinuous].join(' '),
      أَنْتُمَا: ['are', verb.presentContinuous].join(' '),
      أَنْتُمْ: ['are', verb.presentContinuous].join(' '),
    },
    feminine: {
      أَنْتِ: ['are', verb.presentContinuous].join(' '),
      أَنْتُمَا: ['are', verb.presentContinuous].join(' '),
      أَنْتُنَّ: ['are', verb.presentContinuous].join(' '),
    },
  },
  '1st': {
    أَنَا: ['am', verb.presentContinuous].join(' '),
    نَحْنُ: ['are', verb.presentContinuous].join(' '),
  },
})

const generateMudariMajhoolTasreef = (verb: {
  passive?: string
}): VerbConjugations['مضارع']['مجهول'] => ({
  '3rd': {
    masculine: {
      هُوَ: ['is being', verb.passive].join(' '),
      هُمَا: ['are being', verb.passive].join(' '),
      هُمْ: ['are being', verb.passive].join(' '),
    },
    feminine: {
      هِيَ: ['is being', verb.passive].join(' '),
      هُمَا: ['are being', verb.passive].join(' '),
      هُنَّ: ['are being', verb.passive].join(' '),
    },
  },
  '2nd': {
    masculine: {
      أَنْتَ: ['are being', verb.passive].join(' '),
      أَنْتُمَا: ['are being', verb.passive].join(' '),
      أَنْتُمْ: ['are being', verb.passive].join(' '),
    },
    feminine: {
      أَنْتِ: ['are being', verb.passive].join(' '),
      أَنْتُمَا: ['are being', verb.passive].join(' '),
      أَنْتُنَّ: ['are being', verb.passive].join(' '),
    },
  },
  '1st': {
    أَنَا: ['am being', verb.passive].join(' '),
    نَحْنُ: ['are being', verb.passive].join(' '),
  },
})

const generateNasbMaroofTasreef = (verb: {
  base: string
  prefixToBe?: boolean
}): VerbConjugations['مضارع']['معروف'] => ({
  '3rd': {
    masculine: {
      هُوَ: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
      هُمَا: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
      هُمْ: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
    },
    feminine: {
      هِيَ: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
      هُمَا: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
      هُنَّ: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
    },
  },
  '2nd': {
    masculine: {
      أَنْتَ: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
      أَنْتُمَا: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
      أَنْتُمْ: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
    },
    feminine: {
      أَنْتِ: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
      أَنْتُمَا: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
      أَنْتُنَّ: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
    },
  },
  '1st': {
    أَنَا: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
    نَحْنُ: ['will not', verb.prefixToBe ? 'be' : '', verb.base].join(' '),
  },
})

const generateNasbMajhoolTasreef = (verb: {
  passive?: string
}): VerbConjugations['مضارع']['مجهول'] => ({
  '3rd': {
    masculine: {
      هُوَ: ['will not be', verb.passive].join(' '),
      هُمَا: ['will not be', verb.passive].join(' '),
      هُمْ: ['will not be', verb.passive].join(' '),
    },
    feminine: {
      هِيَ: ['will not be', verb.passive].join(' '),
      هُمَا: ['will not be', verb.passive].join(' '),
      هُنَّ: ['will not be', verb.passive].join(' '),
    },
  },
  '2nd': {
    masculine: {
      أَنْتَ: ['will not be', verb.passive].join(' '),
      أَنْتُمَا: ['will not be', verb.passive].join(' '),
      أَنْتُمْ: ['will not be', verb.passive].join(' '),
    },
    feminine: {
      أَنْتِ: ['will not be', verb.passive].join(' '),
      أَنْتُمَا: ['will not be', verb.passive].join(' '),
      أَنْتُنَّ: ['will not be', verb.passive].join(' '),
    },
  },
  '1st': {
    أَنَا: ['will not be', verb.passive].join(' '),
    نَحْنُ: ['will not be', verb.passive].join(' '),
  },
})

const generateJazmMaroofTasreef = (verb: {
  base: string
}): VerbConjugations['مضارع']['معروف'] => ({
  '3rd': {
    masculine: {
      هُوَ: ['did not', verb.base].join(' '),
      هُمَا: ['did not', verb.base].join(' '),
      هُمْ: ['did not', verb.base].join(' '),
    },
    feminine: {
      هِيَ: ['did not', verb.base].join(' '),
      هُمَا: ['did not', verb.base].join(' '),
      هُنَّ: ['did not', verb.base].join(' '),
    },
  },
  '2nd': {
    masculine: {
      أَنْتَ: ['did not', verb.base].join(' '),
      أَنْتُمَا: ['did not', verb.base].join(' '),
      أَنْتُمْ: ['did not', verb.base].join(' '),
    },
    feminine: {
      أَنْتِ: ['did not', verb.base].join(' '),
      أَنْتُمَا: ['did not', verb.base].join(' '),
      أَنْتُنَّ: ['did not', verb.base].join(' '),
    },
  },
  '1st': {
    أَنَا: ['did not', verb.base].join(' '),
    نَحْنُ: ['did not', verb.base].join(' '),
  },
})

const generateJazmMajhoolTasreef = (verb: {
  passive?: string
}): VerbConjugations['مضارع']['مجهول'] => ({
  '3rd': {
    masculine: {
      هُوَ: ['was not', verb.passive].join(' '),
      هُمَا: ['were not', verb.passive].join(' '),
      هُمْ: ['were not', verb.passive].join(' '),
    },
    feminine: {
      هِيَ: ['was not', verb.passive].join(' '),
      هُمَا: ['were not', verb.passive].join(' '),
      هُنَّ: ['were not', verb.passive].join(' '),
    },
  },
  '2nd': {
    masculine: {
      أَنْتَ: ['were not', verb.passive].join(' '),
      أَنْتُمَا: ['were not', verb.passive].join(' '),
      أَنْتُمْ: ['were not', verb.passive].join(' '),
    },
    feminine: {
      أَنْتِ: ['were not', verb.passive].join(' '),
      أَنْتُمَا: ['were not', verb.passive].join(' '),
      أَنْتُنَّ: ['were not', verb.passive].join(' '),
    },
  },
  '1st': {
    أَنَا: ['was not', verb.passive].join(' '),
    نَحْنُ: ['were not', verb.passive].join(' '),
  },
})

const generateAmrTasreef = (verb: {
  base: string
  prefixToBe?: boolean
}): VerbConjugations['أمر'] => ({
  '2nd': {
    masculine: {
      أَنْتَ: [verb.prefixToBe ? 'be' : '', verb.base + '!'].join(' '),
      أَنْتُمَا: [verb.prefixToBe ? 'be' : '', verb.base + '!'].join(' '),
      أَنْتُمْ: [verb.prefixToBe ? 'be' : '', verb.base + '!'].join(' '),
    },
    feminine: {
      أَنْتِ: [verb.prefixToBe ? 'be' : '', verb.base + '!'].join(' '),
      أَنْتُمَا: [verb.prefixToBe ? 'be' : '', verb.base + '!'].join(' '),
      أَنْتُنَّ: [verb.prefixToBe ? 'be' : '', verb.base + '!'].join(' '),
    },
  },
})
