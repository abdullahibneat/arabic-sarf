import '../styles/SarfSagheer.scss'

import Text from './Text'
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
      <Text>
        {ماضي.معروف} {مضارع.معروف} {مصضر[0]} <span>فهو</span> {فاعل}
      </Text>

      {مجهول && (
        <Text>
          <span>و</span> {مجهول.ماضي} {مجهول.مضارع} {مصضر[0]} <span>فهو</span>{' '}
          {مجهول.مفعول}
        </Text>
      )}

      <Text>
        <span>الأمر منه</span> {أمر} <span>و النّهي عنه</span> لا {نهي}
      </Text>
    </div>
  )
}

export default SarfSagheer
