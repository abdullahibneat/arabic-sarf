import {
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import Icon from './Icon'
import cx from 'classix'
import { showRootLetterEditorAtom } from '@/atoms'
import { twMerge } from 'tailwind-merge'
import { useAtom } from 'jotai'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import useRootLetters from '@/hooks/useRootLetters'

type Props = {
  rootLetters?: { ف?: string; ع?: string; ل?: string } | null
  setRootLetters?: (
    rootLetters:
      | { ف?: string; ع?: string; ل?: string }
      | null
      | ((
          rootLetters: { ف?: string; ع?: string; ل?: string } | null,
        ) => { ف?: string; ع?: string; ل?: string } | null),
  ) => void
}

const RootLetters = ({ rootLetters, setRootLetters }: Props) => {
  const [open, setOpen] = useState(false)
  const [persist, setPersist] = useState(false)
  const [customRootLetters, setCustomRootLetters] = useState({
    ف: 'ف',
    ع: 'ع',
    ل: 'ل',
  })

  const [showRootLetterEditor] = useAtom(showRootLetterEditorAtom)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const availableRootLetters = useRootLetters()

  useEffect(() => {
    /**
     * When persisting is disabled, default to the first root letters whenever user navigates to a different chapter
     */
    if (!persist) reset()
  }, [availableRootLetters])

  useEffect(() => {
    /**
     * Update the root letters whenever the custom root letters change
     */
    setRootLetters?.(customRootLetters)
  }, [customRootLetters])

  useOnClickOutside(dropdownRef, (e) => {
    /**
     * Close the dropdown when the user clicks outside of it.
     */

    // This `if` stataement is used to prevent closing when user clicks inside the dropdown (e.g. selects an option)
    if (buttonRef.current?.contains(e.target as Node)) {
      return
    }

    setOpen(false)
  })

  const reset = () => {
    if (availableRootLetters.length > 0) {
      setRootLetters?.(availableRootLetters[0])
    } else {
      // `null` is used in the overview pages, so that each tasreef is rendered using each chapter's root letters
      setRootLetters?.(null)
    }
  }

  const handleRootLetterChange = useCallback(
    (letter: keyof typeof customRootLetters) =>
      (event: { target: HTMLInputElement }) => {
        const arabic = /^[\sء-ي]$/.test(event.target.value)

        if (!arabic) return

        setCustomRootLetters((customRootLetters) => ({
          ...customRootLetters,
          [letter]: event.target.value || letter,
        }))

        // Focus the next input
        const nextInput = event.target.nextElementSibling

        if (nextInput instanceof HTMLInputElement) {
          nextInput.focus()
        } else {
          event.target.blur()
        }
      },
    [],
  )

  return (
    <div key="root-letters" className="relative">
      <button
        ref={buttonRef}
        className={twMerge(
          cx(
            'm-1 flex h-8 w-16 items-center justify-center gap-1 rounded-md px-1',
            rootLetters &&
              'bg-zinc-900 text-white hover:bg-zinc-700 active:bg-zinc-500',
            !rootLetters &&
              'bg-zinc-100 text-zinc-300 hover:bg-zinc-200 active:bg-zinc-300',
          ),
        )}
        style={{ transition: 'background-color 250ms' }}
        onClick={() => setOpen((open) => !open)}
      >
        <span className="flex-1">
          {rootLetters
            ? `${rootLetters.ف}${rootLetters.ع}${rootLetters.ل}`
            : 'فعل'}
        </span>

        <Icon size="small" name="chevron" />
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute inset-x-[-25%] bottom-12 flex flex-col divide-y rounded-md border-[1px] border-zinc-300 bg-white"
        >
          <div className="flex flex-col divide-y">
            {showRootLetterEditor && (
              <DropdownOption
                selected={
                  !!rootLetters &&
                  JSON.stringify(rootLetters) ===
                    JSON.stringify(customRootLetters)
                }
                onClick={() => setRootLetters?.(customRootLetters)}
              >
                <div className="flex flex-row-reverse">
                  <CustomRootLetterInput
                    letter="ف"
                    rootLetters={customRootLetters}
                    onChange={handleRootLetterChange('ف')}
                  />
                  <CustomRootLetterInput
                    letter="ع"
                    rootLetters={customRootLetters}
                    onChange={handleRootLetterChange('ع')}
                  />
                  <CustomRootLetterInput
                    letter="ل"
                    rootLetters={customRootLetters}
                    onChange={handleRootLetterChange('ل')}
                  />
                </div>
              </DropdownOption>
            )}

            {availableRootLetters.map(($rootLetters, i) => (
              <DropdownOption
                key={i}
                selected={
                  !!rootLetters &&
                  JSON.stringify(rootLetters) === JSON.stringify($rootLetters)
                }
                onClick={() => setRootLetters?.($rootLetters)}
              >
                {`${$rootLetters.ف}${$rootLetters.ع}${$rootLetters.ل}`}
              </DropdownOption>
            ))}
          </div>

          <div className="flex h-8 items-center gap-2 px-2">
            <label
              htmlFor="persist-root-letters"
              className="flex-1 cursor-pointer select-none text-sm"
            >
              Lock
            </label>
            <input
              id="persist-root-letters"
              type="checkbox"
              className="accent-zinc-900"
              checked={persist}
              onChange={(e) => setPersist(e.target.checked)}
            />
          </div>

          <div className="flex h-8 cursor-pointer items-center gap-2 px-2">
            <button className="select-none text-sm underline" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RootLetters

const DropdownOption = ({
  selected,
  children,
  onClick,
}: {
  selected?: boolean
  children?: ReactNode
  onClick: () => void
}) => (
  <button onClick={onClick} className="flex h-8 items-center gap-1 px-2">
    {typeof children === 'string' && (
      <span className="flex-1 text-right">{children}</span>
    )}
    {typeof children !== 'string' && children}
    <Icon size="small" name={selected ? 'radio-checked' : 'radio'} />
  </button>
)

const CustomRootLetterInput = <T extends { ف: string; ع: string; ل: string }>({
  letter,
  rootLetters,
  onChange,
}: {
  letter: keyof T
  rootLetters: T
  onChange?: ChangeEventHandler<HTMLInputElement>
}) => (
  <input
    className="h-6 w-6 rounded-full border-[1px] border-zinc-300 text-center"
    type="text"
    minLength={1}
    maxLength={1}
    value={String(rootLetters[letter])}
    onFocus={(e) => e.target.select()}
    onChange={onChange}
  />
)
