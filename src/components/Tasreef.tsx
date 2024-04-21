import '../styles/Tasreef.scss'

import { AppStateType } from '../AppState'
import IconButton from './IconButton'
import { VerbTasreef } from '../../data/types'
import useAppState from '../hooks/useAppState'
import useAudioPlayer from '../hooks/useAudioPlayer'
import { useMemo } from 'preact/hooks'

export type TasreefProps = {
  title: string
  tasreef: VerbTasreef | { '2nd': VerbTasreef['2nd'] }
  particle?: string
  audioSrc?: string
  groupMode?: AppStateType['settings']['tasreefGroupMode']
}

const Tasreef = ({
  title,
  tasreef,
  particle,
  audioSrc,
  groupMode,
}: TasreefProps) => {
  const { settings } = useAppState()

  const audioPlayer = useAudioPlayer()

  const prefix = useMemo(() => (particle ? particle + ' ' : ''), [particle])

  return (
    <div class={`tasreef ${groupMode || settings.tasreefGroupMode}`}>
      <div class="header">
        {audioSrc && (
          <div class="play">
            <IconButton
              size="micro"
              name="play"
              color="text-secondary"
              hoverColor="text"
              onClick={() => audioPlayer.setSrc(audioSrc)}
            />
          </div>
        )}
        <div>{title}</div>
      </div>

      <div class="person">
        <div class="gender">
          <div>
            <p>
              {'3rd' in tasreef
                ? prefix + tasreef['3rd']['masculine']['هُوَ']
                : ''}
            </p>
            <span>1</span>
          </div>
          <div>
            <p>
              {'3rd' in tasreef
                ? prefix + tasreef['3rd']['masculine']['هُمَا']
                : ''}
            </p>
            <span>2</span>
          </div>
          <div>
            <p>
              {'3rd' in tasreef
                ? prefix + tasreef['3rd']['masculine']['هُمْ']
                : ''}
            </p>
            <span>3</span>
          </div>
        </div>
        <div class="gender">
          <div>
            <p>
              {'3rd' in tasreef
                ? prefix + tasreef['3rd']['feminine']['هِيَ']
                : ''}
            </p>
            <span>4</span>
          </div>
          <div>
            <p>
              {'3rd' in tasreef
                ? prefix + tasreef['3rd']['feminine']['هُمَا']
                : ''}
            </p>
            <span>5</span>
          </div>
          <div>
            <p>
              {'3rd' in tasreef
                ? prefix + tasreef['3rd']['feminine']['هُنَّ']
                : ''}
            </p>
            <span>6</span>
          </div>
        </div>
      </div>

      <div class="person">
        <div class="gender">
          <div>
            <p>{prefix + tasreef['2nd']['masculine']['أَنْتَ']}</p>
            <span>7</span>
          </div>
          <div>
            <p>{prefix + tasreef['2nd']['masculine']['أَنْتُمَا']}</p>
            <span>8</span>
          </div>
          <div>
            <p>{prefix + tasreef['2nd']['masculine']['أَنْتُمْ']}</p>
            <span>9</span>
          </div>
        </div>
        <div class="gender">
          <div>
            <p>{prefix + tasreef['2nd']['feminine']['أَنْتِ']}</p>
            <span>10</span>
          </div>
          <div>
            <p>{prefix + tasreef['2nd']['feminine']['أَنْتُمَا']}</p>
            <span>11</span>
          </div>
          <div>
            <p>{prefix + tasreef['2nd']['feminine']['أَنْتُنَّ']}</p>
            <span>12</span>
          </div>
        </div>
      </div>

      <div class="first person">
        <div class="gender">
          <div>
            <p>{'1st' in tasreef ? prefix + tasreef['1st']['أَنَا'] : ''}</p>
            <span>13</span>
          </div>
          <div>
            <p>{'1st' in tasreef ? prefix + tasreef['1st']['نَحْنُ'] : ''}</p>
            <span>14</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasreef
