import nasara from './sahih/1/نَصَرَ.json'
import daraba from './sahih/1/ضَرَبَ.json'
import fataha from './sahih/1/فَتَحَ.json'
import samia from './sahih/1/سَمِعَ.json'
import karuma from './sahih/1/كَرُمَ.json'
import hasiba from './sahih/1/حَسِبَ.json'

import sahihForm2 from './sahih/2.json'
import sahihForm3 from './sahih/3.json'
import sahihForm4 from './sahih/4.json'
import sahihForm5 from './sahih/5.json'
import sahihForm6 from './sahih/6.json'
import sahihForm7 from './sahih/7.json'
import sahihForm8 from './sahih/8.json'
import sahihForm9 from './sahih/9.json'
import sahihForm10 from './sahih/10.json'

import qaala from './ajwaf/1/قَالَ.json'
import baaa from './ajwaf/1/بَاعَ.json'
import khaafa from './ajwaf/1/خَافَ.json'

import ajwafForm2 from './ajwaf/2.json'
import ajwafForm3 from './ajwaf/3.json'
import ajwafForm4 from './ajwaf/4.json'
import ajwafForm5 from './ajwaf/5.json'
import ajwafForm6 from './ajwaf/6.json'
import ajwafForm7 from './ajwaf/7.json'
import ajwafForm8 from './ajwaf/8.json'
import ajwafForm9 from './ajwaf/9.json'
import ajwafForm10 from './ajwaf/10.json'

import daaa from './naqis/1/دَعَا.json'
import ramaa from './naqis/1/رَمَى.json'
import radia from './naqis/1/رَضِيَ.json'
import nahaa from './naqis/1/نَهَى.json'

import naqisForm2 from './naqis/2.json'
import naqisForm3 from './naqis/3.json'
import naqisForm4 from './naqis/4.json'
import naqisForm5 from './naqis/5.json'
import naqisForm6 from './naqis/6.json'
import naqisForm7 from './naqis/7.json'
import naqisForm8 from './naqis/8.json'
import naqisForm10 from './naqis/10.json'

import { VerbType } from './types'

const صحيح: VerbType = {
  I: {
    نَصَرَ: nasara,
    ضَرَبَ: daraba,
    فَتَحَ: fataha,
    سَمِعَ: samia,
    كَرُمَ: karuma,
    حَسِبَ: hasiba,
  },
  II: sahihForm2,
  III: sahihForm3,
  IV: sahihForm4,
  V: sahihForm5,
  VI: sahihForm6,
  VII: sahihForm7,
  VIII: sahihForm8,
  IX: sahihForm9,
  X: sahihForm10,
}

const أجوف: VerbType = {
  I: {
    قَالَ: qaala,
    بَاعَ: baaa,
    خَافَ: khaafa,
  },
  II: ajwafForm2,
  III: ajwafForm3,
  IV: ajwafForm4,
  V: ajwafForm5,
  VI: ajwafForm6,
  VII: ajwafForm7,
  VIII: ajwafForm8,
  IX: ajwafForm9,
  X: ajwafForm10,
}

const ناقص: VerbType = {
  I: {
    دَعَا: daaa,
    رَمَى: ramaa,
    رَضِيَ: radia,
    نَهَى: nahaa,
  },
  II: naqisForm2,
  III: naqisForm3,
  IV: naqisForm4,
  V: naqisForm5,
  VI: naqisForm6,
  VII: naqisForm7,
  VIII: naqisForm8,
  IX: null,
  X: naqisForm10,
}

const verbTypes: Record<string, VerbType> = { صحيح, أجوف, ناقص }

export default verbTypes
