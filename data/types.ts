export type VerbTypes = Record<
  string,
  Record<string, VerbChapter | undefined> | VerbChapter | null | undefined
>

export type VerbChapter = {
  type: string
  form: number
  باب: string
  title: string
  root_letters: Array<string[]>
  archetype: VerbArchetype
  conjugations: VerbConjugations
}

export type VerbArchetype = {
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
  نصب: {
    معروف: VerbTasreef
    مجهول: VerbTasreef | null
  }
  جزم: {
    معروف: VerbTasreef
    مجهول: VerbTasreef | null
  }
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
