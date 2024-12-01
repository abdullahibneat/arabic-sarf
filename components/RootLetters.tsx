import {
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import Icon from './Icon'
import cx from 'classix'
import posthog from 'posthog-js'
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
  const [isUsingCustomRootLetters, setIsUsingCustomRootLetters] =
    useState(false)
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
     * Reset root letters when not using locked custom root letters
     */
    if (!isUsingCustomRootLetters || !persist) reset()
  }, [availableRootLetters])

  useEffect(() => {
    /**
     * Update the root letters whenever the custom root letters change
     */
    if (isUsingCustomRootLetters) setRootLetters?.(customRootLetters)
  }, [isUsingCustomRootLetters, customRootLetters])

  useOnClickOutside(dropdownRef, () => {
    /**
     * Close the dropdown when the user clicks outside of it.
     */
    setOpen(false)
  })

  const placeholder = useMemo(() => {
    if (availableRootLetters.length > 0) {
      const { ف, ع, ل } = availableRootLetters[0]
      return `${ف}${ع}${ل}`
    }
    return 'فعل'
  }, [availableRootLetters])

  const handleOpenDropdown = useCallback(() => {
    setOpen(true)
    posthog.capture('Open Root Letters Dropdown')
  }, [])

  const reset = useCallback(() => {
    setIsUsingCustomRootLetters(false)
    setRootLetters?.(null)
  }, [])

  const handleRootLetterChange = useCallback(
    (letter: keyof typeof customRootLetters) =>
      (event: { target: HTMLInputElement }) => {
        const arabic = /^[\sء-ي]$/.test(event.target.value)

        if (!arabic) return

        setIsUsingCustomRootLetters(true)

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

  const handleSelectCustomRootLetters = useCallback(() => {
    setIsUsingCustomRootLetters(true)
    setRootLetters?.(customRootLetters)
    posthog.capture('Root Letters Changed', {
      rootLetters: customRootLetters,
      custom: true,
    })
  }, [setRootLetters, customRootLetters])

  const handleSelectRootLetters = useCallback(
    (rootLetters: { ف?: string; ع?: string; ل?: string }) => () => {
      setIsUsingCustomRootLetters(false)
      setRootLetters?.(rootLetters)
      posthog.capture('Root Letters Changed', { rootLetters, custom: false })
    },
    [setRootLetters],
  )

  const enablePersist = useCallback(
    (persist: boolean) => {
      setPersist(persist)
      posthog.capture('Persist Root Letters Changed', { persist })
      if (persist && !rootLetters) {
        setRootLetters?.(availableRootLetters[0] || null)
      }
    },
    [rootLetters, setRootLetters],
  )

  return (
    <div key="root-letters" className="relative">
      <button
        ref={buttonRef}
        className={twMerge(
          cx(
            'm-1 flex h-8 w-16 items-center justify-center gap-1 rounded-md px-1',
            rootLetters && 'bg-white dark:bg-neutral-600',
            !rootLetters &&
              'bg-zinc-100 text-zinc-300 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:active:bg-neutral-600',
          ),
        )}
        style={{ transition: 'background-color 250ms' }}
        onClick={handleOpenDropdown}
      >
        <span className="flex-1">
          {rootLetters
            ? `${rootLetters.ف}${rootLetters.ع}${rootLetters.ل}`
            : placeholder}
        </span>

        <Icon size="small" name="chevron" />
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="fixed bottom-12 flex flex-col divide-y rounded-md border-[1px] border-zinc-300 bg-zinc-100 dark:divide-neutral-500 dark:border-neutral-500 dark:bg-neutral-800"
        >
          <div className="flex flex-col divide-y dark:divide-neutral-500">
            {showRootLetterEditor && (
              <DropdownOption
                selected={isUsingCustomRootLetters}
                onClick={handleSelectCustomRootLetters}
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
                onClick={handleSelectRootLetters($rootLetters)}
              >
                {`${$rootLetters.ف}${$rootLetters.ع}${$rootLetters.ل}`}
              </DropdownOption>
            ))}
          </div>

          {isUsingCustomRootLetters && (
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
                className="accent-zinc-900 dark:accent-neutral-300"
                checked={persist}
                onChange={(e) => enablePersist(e.target.checked)}
              />
            </div>
          )}
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
    className="h-6 w-6 rounded-full border-[1px] border-zinc-300 text-center dark:bg-neutral-800"
    type="text"
    minLength={1}
    maxLength={1}
    value={String(rootLetters[letter])}
    onFocus={(e) => e.target.select()}
    onChange={onChange}
  />
)
