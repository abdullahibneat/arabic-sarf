import '../styles/Tasreef.scss'

import { AppStateType } from '../AppState'
import { VerbTasreef } from '../../data/types'
import useAppState from '../hooks/useAppState'

export type TasreefProps = {
  title: string
  verbTasreef: VerbTasreef
  groupMode?: AppStateType['tasreefGroupMode']
}

const Tasreef = ({ title, verbTasreef, groupMode }: TasreefProps) => {
  const { tasreefGroupMode } = useAppState()

  return (
    <div class={`tasreef ${groupMode || tasreefGroupMode}`}>
      <div class="first person">
        <div class="gender">
          <div>{title}</div>
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
