import '../styles/RootLettersEditor.scss'

import { useCallback, useRef } from 'preact/hooks'

import { JSX } from 'preact'

export type RootLetters = { ف?: string; ع?: string; ل?: string }

type Props = {
  rootLetters?: RootLetters
  mithaal?: boolean
  ajwaf?: boolean
  naqis?: boolean
  onChange?: (rootLetters: RootLetters) => void
}

const RootLettersEditor = ({
  rootLetters = { ف: 'ف', ع: 'ع', ل: 'ل' },
  mithaal,
  ajwaf,
  naqis,
  onChange,
}: Props) => {
  const inputsContainer = useRef<HTMLDivElement>(null)

  const handleFocus = useCallback(
    (event: JSX.TargetedFocusEvent<HTMLInputElement>) => {
      if (event.target instanceof HTMLInputElement) event.target.select()
    },
    [],
  )

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!inputsContainer.current) return
    if (!(event.target instanceof HTMLInputElement)) return

    const ids = Array.from(
      inputsContainer.current.querySelectorAll('input:not(:disabled)'),
    ).map((element) => element.id)

    const currentIndex = ids.indexOf(event.target.id)
    let nextIndex = -1

    if (/(ArrowRight)|(ArrowUp)/.test(event.key)) {
      nextIndex = currentIndex - 1
    } else if (/(Enter)|(ArrowLeft)|(ArrowDown)/.test(event.key)) {
      nextIndex = currentIndex + 1
    } else if (/(Backspace)/.test(event.key)) {
      event.target.value = ''
    } else {
      return
    }

    const nextId = ids[nextIndex]
    const nextInput = inputsContainer.current.querySelector(`#${nextId}`)

    if (nextInput instanceof HTMLInputElement) {
      nextInput.focus()
    } else {
      event.target.blur()
    }
  }, [])

  const handleInput = useCallback(
    (rootLetter: string) =>
      (event: JSX.TargetedEvent<HTMLInputElement, InputEvent>) => {
        if (!(event.target instanceof HTMLInputElement)) return
        if (!inputsContainer.current) return

        const ids = Array.from(
          inputsContainer.current.querySelectorAll('input:not(:disabled)'),
        ).map((element) => element.id)

        const currentIndex = ids.indexOf(event.target.id)
        let nextIndex = -1

        if (event.inputType === 'insertText') {
          const arabic = /\p{Script=Arabic}/u.test(event.data || '')

          if (!arabic) {
            event.target.value = ''
            return
          }

          onChange?.({ ...rootLetters, [rootLetter]: event.data })

          nextIndex = currentIndex + 1

          if (nextIndex > -1) {
            const nextId = ids[nextIndex]
            const nextInput = inputsContainer.current.querySelector(
              `#${nextId}`,
            )

            if (nextInput instanceof HTMLInputElement) {
              nextInput.focus()
            } else {
              event.target.blur()
            }
          }
        }
      },
    [onChange, rootLetters],
  )

  return (
    <div class="root-letters-editor" ref={inputsContainer}>
      <input
        id="input-ف"
        value={mithaal ? 'و/ي' : rootLetters['ف']}
        placeholder="ف"
        maxLength={1}
        disabled={mithaal}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onInput={handleInput('ف')}
      />
      <input
        id="input-ع"
        value={ajwaf ? 'و/ي' : rootLetters['ع']}
        placeholder="ع"
        maxLength={1}
        disabled={ajwaf}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onInput={handleInput('ع')}
      />
      <input
        id="input-ل"
        value={naqis ? 'و/ي' : rootLetters['ل']}
        placeholder="ل"
        maxLength={1}
        disabled={naqis}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onInput={handleInput('ل')}
      />
    </div>
  )
}

export default RootLettersEditor
