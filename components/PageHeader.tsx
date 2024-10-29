import IconButton from './IconButton'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

const PageHeader = () => {
  const router = useRouter()

  const openSearch = useCallback(() => {
    const dialog = document.querySelector('#global-search')
    if (dialog instanceof HTMLDialogElement) {
      router.push('#search', { scroll: false })
      dialog.classList.remove('close')
      dialog.showModal()
    }
  }, [])

  return (
    <div className="absolute inset-x-2 top-0 z-[1] flex h-10 items-center rounded-t-md bg-white px-2 dark:bg-neutral-900">
      <IconButton size="small" name="search" onClick={openSearch} />
    </div>
  )
}

export default PageHeader
