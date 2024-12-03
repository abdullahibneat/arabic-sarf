import { useCallback, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import IconButton from './IconButton'
import Link from 'next/link'
import useSettingsModal from '@/hooks/useSettingsModal'

const PageHeader = () => {
  const router = useRouter()
  const pathname = usePathname()

  const { openSettings } = useSettingsModal()

  useEffect(() => {
    /**
     * Global keyboard listener:
     * - Ctrl+\: toggle sidebar
     * - Ctrl+S: toggle sidebar
     * - Ctrl+B: toggle sidebar
     */
    const keyboardListener = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === '\\' || e.key === 's' || e.key === 'b')
      ) {
        toggleSidebar()
        return
      }
    }
    window.addEventListener('keydown', keyboardListener)
    return () => window.removeEventListener('keydown', keyboardListener)
  }, [])

  const openSearch = useCallback(() => {
    const dialog = document.querySelector('#global-search')
    if (dialog instanceof HTMLDialogElement) {
      router.push('#search', { scroll: false })
      dialog.classList.remove('close')
      dialog.showModal()
    }
  }, [])

  const toggleSidebar = useCallback(() => {
    const sidebar = document.querySelector('aside')?.classList
    sidebar?.toggle('open')
  }, [])

  const goBack = useCallback(() => {
    router.back()
  }, [])

  return (
    <div className="absolute inset-x-2 top-0 z-[1] flex h-10 items-center gap-1 rounded-t-md bg-white px-2 dark:bg-neutral-900">
      <IconButton size="small" name="menu" onClick={toggleSidebar} />
      <IconButton size="small" name="search" onClick={openSearch} />

      <div className="flex-1" />

      <IconButton size="small" name="settings" onClick={openSettings} />
      {pathname.endsWith('/flashcards') ? (
        <IconButton size="small" name="close" onClick={goBack} />
      ) : (
        <Link
          href={
            pathname.endsWith('/')
              ? pathname + 'flashcards'
              : pathname + '/flashcards'
          }
        >
          <IconButton size="small" name="flashcards" />
        </Link>
      )}
    </div>
  )
}

export default PageHeader
