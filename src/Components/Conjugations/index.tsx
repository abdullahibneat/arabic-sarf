import { VerbConjugations, VerbTasreef } from '../../../data/types'
import './Conjugations.scss'

type Props = {
  tasreef: VerbTasreef | VerbConjugations['أمر']
}

const Conjugations = ({ tasreef }: Props) => (
  <div class="conjugationsContainer">
    {'3rd' in tasreef && (
      <div class="person">
        <p>{tasreef['3rd'].feminine['هِيَ']}</p>
        <p>{tasreef['3rd'].masculine['هُوَ']}</p>
        <p>{tasreef['3rd'].feminine['هُمَا']}</p>
        <p>{tasreef['3rd'].masculine['هُمَا']}</p>
        <p>{tasreef['3rd'].feminine['هُنَّ']}</p>
        <p>{tasreef['3rd'].masculine['هُمْ']}</p>
      </div>
    )}

    <div class="person">
      <p>{tasreef['2nd'].feminine['أَنْتِ']}</p>
      <p>{tasreef['2nd'].masculine['أَنْتَ']}</p>
      <p>{tasreef['2nd'].feminine['أَنْتُمَا']}</p>
      <p>{tasreef['2nd'].masculine['أَنْتُمَا']}</p>
      <p>{tasreef['2nd'].feminine['أَنْتُنَّ']}</p>
      <p>{tasreef['2nd'].masculine['أَنْتُمْ']}</p>
    </div>

    {'1st' in tasreef && (
      <div class="first person">
        <p>{tasreef['1st'].أَنَا}</p>
        <p>{tasreef['1st'].نَحْنُ}</p>
      </div>
    )}
  </div>
)

export default Conjugations
