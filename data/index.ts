// import-sort-ignore

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

import wajada from './mithaal/1/وَجَدَ.json'
import wajala from './mithaal/1/وَجِلَ.json'
import wahaba from './mithaal/1/وَهَبَ.json'

import mithaalForm4 from './mithaal/4.json'
import mithaalForm8 from './mithaal/8.json'
import mithaalForm10 from './mithaal/10.json'

import madda from './mudaaf/1/مَدَّ.json'
import farra from './mudaaf/1/فَرَّ.json'
import massa from './mudaaf/1/مَسَّ.json'

import mudaafForm2 from './mudaaf/2.json'
import mudaafForm3 from './mudaaf/3.json'
import mudaafForm4 from './mudaaf/4.json'
import mudaafForm5 from './mudaaf/5.json'
import mudaafForm6 from './mudaaf/6.json'
import mudaafForm7 from './mudaaf/7.json'
import mudaafForm8 from './mudaaf/8.json'
import mudaafForm10 from './mudaaf/10.json'

import { VerbChapter } from './types'

const صحيح = new Map<string, VerbChapter | null | undefined>([
  ['نَصَرَ', nasara],
  ['ضَرَبَ', daraba],
  ['فَتَحَ', fataha],
  ['سَمِعَ', samia],
  ['حَسِبَ', hasiba],
  ['كَرُمَ', karuma],
  ['2', sahihForm2],
  ['3', sahihForm3],
  ['4', sahihForm4],
  ['5', sahihForm5],
  ['6', sahihForm6],
  ['7', sahihForm7],
  ['8', sahihForm8],
  ['9', sahihForm9],
  ['10', sahihForm10],
])

const أجوف = new Map<string, VerbChapter | null | undefined>([
  ['قَالَ', qaala],
  ['بَاعَ', baaa],
  ['خَافَ', khaafa],
  ['2', ajwafForm2],
  ['3', ajwafForm3],
  ['4', ajwafForm4],
  ['5', ajwafForm5],
  ['6', ajwafForm6],
  ['7', ajwafForm7],
  ['8', ajwafForm8],
  ['9', ajwafForm9],
  ['10', ajwafForm10],
])

const ناقص = new Map<string, VerbChapter | null | undefined>([
  ['دَعَا', daaa],
  ['رَمَى', ramaa],
  ['رَضِيَ', radia],
  ['نَهَى', nahaa],
  ['2', naqisForm2],
  ['3', naqisForm3],
  ['4', naqisForm4],
  ['5', naqisForm5],
  ['6', naqisForm6],
  ['7', naqisForm7],
  ['8', naqisForm8],
  ['9', null],
  ['10', naqisForm10],
])

const مثال = new Map<string, VerbChapter | null | undefined>([
  ['وَجَدَ', wajada],
  ['وَجِلَ', wajala],
  ['وَهَبَ', wahaba],
  [
    '2',
    {
      ...sahihForm2,
      type: 'مثال',
      root_letters: [{ arabic: { ف: 'و', ع: 'ح', ل: 'د' }, english: 'unite' }],
    },
  ],
  [
    '3',
    {
      ...sahihForm3,
      type: 'مثال',
      root_letters: [{ arabic: { ف: 'و', ع: 'ف', ل: 'ق' }, english: 'agree' }],
    },
  ],
  ['4', mithaalForm4],
  [
    '5',
    {
      ...sahihForm5,
      type: 'مثال',
      root_letters: [{ arabic: { ف: 'و', ع: 'ك', ل: 'ل' }, english: 'trust' }],
    },
  ],
  [
    '6',
    {
      ...sahihForm6,
      type: 'مثال',
      root_letters: [
        {
          arabic: { ف: 'و', ع: 'ض', ل: 'ع' },
          english: {
            base: 'behave humbly',
            past: 'behaved humbly',
            presentContinuous: 'behaving humbly',
            passive: 'made to behave humbly',
          },
        },
      ],
    },
  ],
  ['7', null],
  ['8', mithaalForm8],
  ['9', null],
  ['10', mithaalForm10],
])

const مضاعف = new Map<string, VerbChapter | null | undefined>([
  ['مَدَّ', madda],
  ['فَرَّ', farra],
  ['مَسَّ', massa],
  ['2', mudaafForm2],
  ['3', mudaafForm3],
  ['4', mudaafForm4],
  ['5', mudaafForm5],
  ['6', mudaafForm6],
  ['7', mudaafForm7],
  ['8', mudaafForm8],
  ['9', null],
  ['10', mudaafForm10],
])

const verbTypes: Map<
  string,
  Map<string, VerbChapter | null | undefined>
> = new Map([
  ['صحيح', صحيح],
  ['أجوف', أجوف],
  ['ناقص', ناقص],
  ['مثال', مثال],
  ['مضاعف', مضاعف],
])

export default verbTypes
