import '../styles/SarfSagheer.scss'

import { VerbChapter } from '../../data/types'
import { useMemo } from 'preact/hooks'

type Props = {
  chapter: VerbChapter
}

const SarfSagheer = ({ chapter }: Props) => {
  const {
    archetype: { ماضي, مضارع, مصضر, فاعل, مفعول, أمر, نهي },
  } = chapter

  const مجهول = useMemo(() => {
    if (!ماضي.مجهول) return null
    if (!مضارع.مجهول) return null
    if (!مفعول) return null

    return {
      ماضي: ماضي.مجهول,
      مضارع: مضارع.مجهول,
      مفعول,
    }
  }, [ماضي, مضارع, مفعول])

  return (
    <div class="sarf-sagheer">
      <p>
        {ماضي.معروف} {مضارع.معروف} {مصضر[0]} <span>فهو</span> {فاعل}
      </p>

      {مجهول && (
        <p>
          <span>و</span> {مجهول.ماضي} {مجهول.مضارع} {مصضر[0]} <span>فهو</span>{' '}
          {مجهول.مفعول}
        </p>
      )}

      <p>
        <span>الأمر منه</span> {أمر} <span>و النّهي عنه</span> لا {نهي}
      </p>
    </div>
  )
}

export default SarfSagheer
