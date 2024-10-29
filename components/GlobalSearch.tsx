import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useParams, useRouter } from 'next/navigation'

import Dialog from './Dialog'
import Link from 'next/link'
import cx from 'classix'
import { twMerge } from 'tailwind-merge'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import useSearchResults from '@/hooks/useSearchResults'

const GlobalSearch = () => {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const dialog = useRef<HTMLDialogElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const highlight = useRef<HTMLDivElement>(null)
  const hovering = useRef(false)

  const router = useRouter()
  const params = useParams()
  const searchResults = useSearchResults(search)

  useEffect(() => {
    // Close the global search when navigating back
    if (dialog.current?.open && window.location.hash !== '#search') {
      close(false)
    }
  }, [params])

  /**
   * Close the global search when clicking outside of the search input
   */
  useOnClickOutside(input, (e) => {
    if (!dialog.current?.open) return

    // This `if` stataement is used to prevent closing when user clicks inside the dropdown (e.g. selects an option)
    if (content.current?.contains(e.target as Node)) {
      return
    }

    close()
  })

  const open = useCallback(() => {
    if (dialog.current?.open) return
    // #search hash is used so that when the back button is pressed, or back gesture is performed on mobile, it triggers the global search to close
    router.push('#search', { scroll: false })
    dialog.current?.classList.remove('close')
    dialog.current?.showModal()
  }, [])

  const close = useCallback((goBack = true) => {
    if (goBack) router.back()
    dialog.current?.classList.add('close')
    setTimeout(() => dialog.current?.close(), 250)
  }, [])

  useEffect(() => {
    /**
     * Global keyboard listener:
     * - Ctrl+K: open global search
     * - ArrowUp: select previous chapter
     * - ArrowDown: select next chapter
     * - Enter: navigate to selected chapter
     */
    const keyboardListener = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        open()
        return
      }

      if (!dialog.current?.open) {
        // Ignore event if the global search is not open
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((selectedIndex) => normalised(selectedIndex - 1))
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((selectedIndex) => normalised(selectedIndex + 1))
        return
      }

      if (e.key === 'Enter') {
        e.preventDefault()
        const result = document.querySelector(`#global-search-selected-result`)
        if (result instanceof HTMLElement) {
          result.click()
        }
      }
    }
    window.addEventListener('keydown', keyboardListener)
    return () => window.removeEventListener('keydown', keyboardListener)
  }, [])

  /**
   * Ensure selected index is still valid when search results change
   */
  useEffect(() => {
    setSelectedIndex((selectedIndex) => normalised(selectedIndex))
  }, [searchResults.length])

  /**
   * Ensure selected result is highlighted and in view
   */
  useEffect(() => {
    const element = getResultElements()[selectedIndex]

    if (!element) return

    if (!hovering.current) {
      // Only scroll into view when using keyboard
      element.scrollIntoView({ behavior: 'smooth' })
    }

    if (highlight.current) {
      highlight.current.style.top = `${element.offsetTop}px`
    }
  }, [selectedIndex])

  const getResultElements = useCallback(() => {
    return document.querySelectorAll<HTMLElement>(
      '.global-search-selected-result',
    )
  }, [])

  /**
   * Function to ensure that an index is within the `searchResults` array bounds
   */
  const normalised = useCallback((index: number) => {
    const resultElements = getResultElements()
    const max = resultElements.length - 1
    if (index < 0) return 0
    if (index > max) return max
    return index
  }, [])

  const handleCancel = useCallback((e: SyntheticEvent) => {
    e.preventDefault()
    close()
  }, [])

  const handleMouseEnter = useCallback(
    (index: number) => () => {
      hovering.current = true
      setSelectedIndex(index)
    },
    [],
  )

  const handleMouseLeave = useCallback(() => {
    hovering.current = false
  }, [])

  return (
    <Dialog id="global-search" ref={dialog} onCancel={handleCancel}>
      <div
        ref={content}
        className="flex max-h-64 w-10/12 max-w-lg flex-col rounded-lg border-[1px] border-zinc-300 bg-white shadow-xl drop-shadow-xl dark:border-neutral-500 dark:bg-zinc-900"
      >
        <input
          ref={input}
          className="h-14 bg-transparent px-4 text-zinc-900 outline-none dark:text-neutral-100"
          inputMode="search"
          placeholder="Search"
          value={search}
          onFocus={(e) => e.target.select()}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <div className="h-[1px] w-full bg-zinc-300 dark:bg-neutral-500" />
        )}

        <div
          dir="rtl"
          className={twMerge(
            cx(
              'relative flex h-0 scroll-p-4 flex-col gap-1 overflow-y-auto px-4',
              searchResults.length > 0 && 'h-52 py-4',
              searchResults.length === 0 && search && 'h-14 justify-center',
            ),
          )}
          style={{ transition: 'height 250ms' }}
        >
          {searchResults.map(({ item: chapter }, index) => (
            <Link
              key={chapter.key}
              id={
                index === selectedIndex
                  ? 'global-search-selected-result'
                  : undefined
              }
              href={`/${chapter.key}`}
              replace={true}
              className={cx(
                'global-search-selected-result',
                twMerge(
                  'flex h-9 shrink-0 cursor-pointer items-center rounded-md px-2 text-zinc-500 outline-none dark:text-neutral-200',
                  index === selectedIndex && 'text-inherit',
                ),
              )}
              style={{ transition: 'background-color 250ms, color 250ms' }}
              onMouseEnter={handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {chapter.name}
            </Link>
          ))}

          {selectedIndex > -1 && (
            <div
              ref={highlight}
              className="absolute inset-x-4 -z-10 h-9 rounded-md bg-zinc-200 dark:bg-neutral-700"
              style={{ transition: 'top 250ms' }}
            />
          )}

          {searchResults.length === 0 && search && (
            <p className="text-sm text-zinc-500 dark:text-neutral-200">
              No results found
            </p>
          )}
        </div>
      </div>
    </Dialog>
  )
}

export default GlobalSearch
