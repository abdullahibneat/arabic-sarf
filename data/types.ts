export type RomanNumeral =
  | 'I'
  | 'II'
  | 'III'
  | 'IV'
  | 'V'
  | 'VI'
  | 'VII'
  | 'VIII'
  | 'IX'
  | 'X'

export type VerbType<Mujarrad extends string = string> = {
  I: Record<Mujarrad, VerbChapter>
} & Record<Exclude<RomanNumeral, 'I'>, VerbChapter | null>

export type VerbChapter = {
  باب: string
  form: number
  archetype: VerbArchetype
  conjugations: VerbConjugations
}

export type VerbArchetype = {
  root_letters: string[]
  ماضي: {
    معروف: string
    مجهول: string | null
  }
  مضارع: {
    معروف: string
    مجهول: string | null
  }
  مصضر: string[]
  فاعل: string
  مفعول: string | null
  أمر: string
  نهي: string
}

export type VerbConjugations = {
  ماضي: {
    معروف: VerbTasreef
    مجهول: VerbTasreef | null
  }
  مضارع: {
    معروف: VerbTasreef
    مجهول: VerbTasreef | null
  }
  نصب: VerbTasreef
  جزم: VerbTasreef
  أمر: { '2nd': VerbSighaSecondPerson }
}

export type VerbTasreef = {
  '1st': VerbSighaFirstPerson
  '2nd': VerbSighaSecondPerson
  '3rd': VerbSighaThirdPerson
}

export type VerbSighaThirdPerson = {
  masculine: {
    هُوَ: string
    هُمَا: string
    هُمْ: string
  }
  feminine: {
    هِيَ: string
    هُمَا: string
    هُنَّ: string
  }
}

export type VerbSighaSecondPerson = {
  masculine: {
    أَنْتَ: string
    أَنْتُمَا: string
    أَنْتُمْ: string
  }
  feminine: {
    أَنْتِ: string
    أَنْتُمَا: string
    أَنْتُنَّ: string
  }
}

export type VerbSighaFirstPerson = {
  أَنَا: string
  نَحْنُ: string
}
