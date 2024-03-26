import '../styles/Tasreef.scss'

import { AppStateType } from '../AppState'
import { VerbChapter } from '../../data/types'
import useAppState from '../hooks/useAppState'
import { useMemo } from 'preact/hooks'

export type TasreefProps = {
  verbChapter: VerbChapter
  groupMode?: AppStateType['tasreefGroupMode']
}

const Tasreef = ({ verbChapter, groupMode }: TasreefProps) => {
  const { tasreefGroupMode } = useAppState()

  const verbTasreef = useMemo(
    () => verbChapter.conjugations.ماضي.معروف,
    [verbChapter],
  )

  return (
    <div class={`tasreef ${groupMode || tasreefGroupMode}`}>
      <div class="first person">
        <div class="gender">
          <div>{verbChapter.باب}</div>
        </div>
      </div>

      <div class="person">
        <div class="gender">
          <div>{verbTasreef['3rd']['masculine']['هُوَ']}</div>
          <div>{verbTasreef['3rd']['masculine']['هُمَا']}</div>
          <div>{verbTasreef['3rd']['masculine']['هُمْ']}</div>
        </div>
        <div class="gender">
          <div>{verbTasreef['3rd']['feminine']['هِيَ']}</div>
          <div>{verbTasreef['3rd']['feminine']['هُمَا']}</div>
          <div>{verbTasreef['3rd']['feminine']['هُنَّ']}</div>
        </div>
      </div>

      <div class="person">
        <div class="gender">
          <div>{verbTasreef['2nd']['masculine']['أَنْتَ']}</div>
          <div>{verbTasreef['2nd']['masculine']['أَنْتُمَا']}</div>
          <div>{verbTasreef['2nd']['masculine']['أَنْتُمْ']}</div>
        </div>
        <div class="gender">
          <div>{verbTasreef['2nd']['feminine']['أَنْتِ']}</div>
          <div>{verbTasreef['2nd']['feminine']['أَنْتُمَا']}</div>
          <div>{verbTasreef['2nd']['feminine']['أَنْتُنَّ']}</div>
        </div>
      </div>

      <div class="first person">
        <div class="gender">
          <div>{verbTasreef['1st']['أَنَا']}</div>
          <div>{verbTasreef['1st']['نَحْنُ']}</div>
        </div>
      </div>
    </div>
  )
}

export default Tasreef
