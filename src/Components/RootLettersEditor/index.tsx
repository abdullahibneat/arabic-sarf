import { useCallback, useRef } from 'preact/hooks'
import './RootLettersEditor.scss'
import { JSX } from 'preact/jsx-runtime'

type RootLetters = { ف: string; ع: string; ل: string }

type Props = {
  rootLetters: RootLetters
  ajwaf?: boolean
  naqis?: boolean
  placeholder?: RootLetters
  onChange?: (rootLetters: RootLetters) => void
}

const RootLettersEditor = ({
  rootLetters,
  ajwaf,
  naqis,
  placeholder = { ف: 'ف', ع: 'ع', ل: 'ل' },
  onChange,
}: Props) => {
  const inputsContainer = useRef<HTMLDivElement>(null)

  /**
   * Select input text on focus
   */
  const handleFocus = useCallback(
    (event: JSX.TargetedFocusEvent<HTMLInputElement>) => {
      if (event.target instanceof HTMLInputElement) event.target.select()
    },
    [],
  )

  /**
   * Jump to next/previous input when pressing arrow keys or backspace
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!inputsContainer.current) return
    if (!(event.target instanceof HTMLInputElement)) return

    const ids = Array.from(
      inputsContainer.current.querySelectorAll(':not(:disabled)'),
    ).map((element) => element.id)

    const currentIndex = ids.indexOf(event.target.id)
    let nextIndex = -1

    if (/(ArrowLeft)|(ArrowDown)/.test(event.key)) {
      nextIndex = currentIndex - 1
    } else if (/(Enter)|(ArrowRight)|(ArrowUp)/.test(event.key)) {
      nextIndex = currentIndex + 1
    }

    if (nextIndex > -1) {
      event.preventDefault()
      const nextId = ids[nextIndex]
      const nextInput = inputsContainer.current.querySelector(`#${nextId}`)
      if (nextInput instanceof HTMLInputElement) nextInput.focus()
    }
  }, [])

  /**
   * Validate Arabic characters and jump to next/previous input
   */
  const handleInput = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement, InputEvent>) => {
      if (!(event.target instanceof HTMLInputElement)) return

      if (!inputsContainer.current) return

      const ids = Array.from(
        inputsContainer.current.querySelectorAll(':not(:disabled)'),
      ).map((element) => element.id)

      const currentIndex = ids.indexOf(event.target.id)
      let nextIndex = -1

      if (event.inputType === 'insertText') {
        const value = event.data || ''
        const arabic = /\p{Script=Arabic}/u.test(value)

        if (!arabic) {
          event.target.value = rootLetters[currentIndex] || ''
          return
        }

        nextIndex = currentIndex + 1

        const newRootLetters = { ...rootLetters }

        if (event.target.id === 'input-ف') {
          newRootLetters['ف'] = value
        } else if (event.target.id === 'input-ع') {
          newRootLetters['ع'] = value
        } else if (event.target.id === 'input-ل') {
          newRootLetters['ل'] = value
        }

        onChange?.(newRootLetters)
      } else if (event.inputType === 'deleteContentBackward') {
        nextIndex = currentIndex - 1
      }

      if (nextIndex > -1) {
        const nextId = ids[nextIndex]
        const nextInput = inputsContainer.current.querySelector(`#${nextId}`)
        if (nextInput instanceof HTMLInputElement) nextInput.focus()
      }
    },
    [rootLetters, onChange],
  )

  return (
    <div ref={inputsContainer} class="inputs">
      <input
        id="input-ف"
        maxLength={1}
        placeholder={placeholder.ف}
        value={rootLetters.ف}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />
      <input
        id="input-ع"
        maxLength={1}
        disabled={ajwaf}
        placeholder={placeholder.ع}
        value={rootLetters.ع}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />
      <input
        id="input-ل"
        maxLength={1}
        disabled={naqis}
        placeholder={placeholder.ل}
        value={rootLetters.ل}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />
    </div>
  )
}

export default RootLettersEditor
