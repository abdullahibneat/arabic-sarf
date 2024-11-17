import { usePathname, useRouter } from 'next/navigation'

import IconButton from './IconButton'
import Link from 'next/link'
import { useCallback } from 'react'

const PageHeader = () => {
  const router = useRouter()
  const pathname = usePathname()

  const openSearch = useCallback(() => {
    const dialog = document.querySelector('#global-search')
    if (dialog instanceof HTMLDialogElement) {
      router.push('#search', { scroll: false })
      dialog.classList.remove('close')
      dialog.showModal()
    }
  }, [])

  const goBack = useCallback(() => {
    router.back()
  }, [])

  return (
    <div className="absolute inset-x-2 top-0 z-[1] flex h-10 items-center rounded-t-md bg-white px-2 dark:bg-neutral-900">
      <IconButton size="small" name="search" onClick={openSearch} />

      <div className="flex-1" />

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
