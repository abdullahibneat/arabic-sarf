export type VerbChapter = {
  type: string
  form: number
  chapter: string
  title: string
  root_letters: RootLetter[]
  فعل: {
    ماضي: {
      معروف: {
        مرفوع: VerbTasreef
        منصوب: null
        مجزوم: null
      }
      مجهول: {
        مرفوع: VerbTasreef | null
        منصوب: null
        مجزوم: null
      }
    }
    مضارع: {
      معروف: {
        مرفوع: VerbTasreef
        منصوب: VerbTasreef
        مجزوم: VerbTasreef
      }
      مجهول: {
        مرفوع: VerbTasreef | null
        منصوب: VerbTasreef | null
        مجزوم: VerbTasreef | null
      }
    }
    أمر: {
      معروف: {
        مرفوع: null
        منصوب: null
        مجزوم: AmrTasreef
      }
      مجهول: {
        مرفوع: null
        منصوب: null
        مجزوم: null
      }
    }
  }
  مشتق: {
    مصدر: string[]
    فاعل: {
      masculine: {
        singular: string
        dual: string
        plural: string
      }
      feminine: {
        singular: string
        dual: string
        plural: string
      }
    }
    مفعول: {
      masculine: {
        singular: string
        dual: string
        plural: string
      }
      feminine: {
        singular: string
        dual: string
        plural: string
      }
    } | null
  }
}

export type RootLetter = {
  arabic: { ف: string; ع: string; ل: string }
  english: EnglishVerb
}

export type EnglishVerb =
  | string
  | {
      base: string
      past?: string
      prefixToBe?: boolean
      presentContinuous?: string
      passive?: string
      specifically?:
        | string
        | {
            base: string
            passive: string
          }
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
  مصدر: string[]
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
  أمر: AmrTasreef
}

export type VerbTasreef = {
  '1st': VerbSighaFirstPerson
  '2nd': VerbSighaSecondPerson
  '3rd': VerbSighaThirdPerson
}

export type AmrTasreef = {
  '2nd': VerbSighaSecondPerson
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
