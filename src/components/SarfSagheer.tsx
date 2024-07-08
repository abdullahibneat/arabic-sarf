import '../styles/SarfSagheer.scss'

import Text from './Text'
import { VerbChapter } from '../../data/types'
import { useMemo } from 'preact/hooks'

export type SarfSagheerProps = {
  chapter: VerbChapter
}

const SarfSagheer = ({ chapter }: SarfSagheerProps) => {
  const {
    فعل: { ماضي, مضارع, أمر },
    مشتق: { مصدر, فاعل, مفعول },
  } = chapter

  const معروف = useMemo(
    () => ({
      ماضي: ماضي.معروف.مرفوع['3rd'].masculine.هُوَ,
      مضارع: مضارع.معروف.مرفوع['3rd'].masculine.هُوَ,
      فاعل: فاعل.masculine.singular,
    }),
    [ماضي, مضارع, مفعول],
  )

  const مجهول = useMemo(() => {
    if (!ماضي.مجهول.مرفوع) return null
    if (!مضارع.مجهول.مرفوع) return null
    if (!مفعول.masculine.singular) return null

    return {
      ماضي: ماضي.مجهول.مرفوع['3rd'].masculine.هُوَ,
      مضارع: مضارع.مجهول.مرفوع['3rd'].masculine.هُوَ,
      مفعول: مفعول.masculine.singular,
    }
  }, [ماضي, مضارع, مفعول])

  const amr = useMemo(() => أمر.معروف.مجزوم['2nd'].masculine.أَنْتَ, [أمر])

  const nahy = useMemo(() => مضارع.معروف.مجزوم['2nd'].masculine.أَنْتَ, [أمر])

  return (
    <div class="sarf-sagheer">
      <Text>
        {معروف.ماضي} {معروف.مضارع} {مصدر[0]} <span>فهو</span> {معروف.فاعل}
      </Text>

      {مجهول && (
        <Text>
          <span>و</span> {مجهول.ماضي} {مجهول.مضارع} {مصدر[0]} <span>فهو</span>{' '}
          {مجهول.مفعول}
        </Text>
      )}

      <Text>
        <span>الأمر منه</span> {amr} <span>و النّهي عنه</span> لا {nahy}
      </Text>
    </div>
  )
}

export default SarfSagheer
