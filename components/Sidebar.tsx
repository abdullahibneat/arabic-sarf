import IconButton from './IconButton'
import Link from 'next/link'
import Settings from './Settings'
import SidebarGroup from './SidebarGroup'
import cx from 'classix'
import { twMerge } from 'tailwind-merge'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import useVerbTypes from '@/hooks/useVerbTypes'

const Sidebar = () => {
  const [showSettings, setShowSettings] = useState(false)

  const verbTypes = useVerbTypes()

  const pathname = usePathname()

  return (
    <aside
      className="flex w-0 shrink-0 flex-col md:w-72 [&.open]:w-72"
      style={{ transition: 'width 250ms, padding 250ms' }}
    >
      <div className="flex w-72 flex-1 flex-col pt-4">
        <div dir="rtl" className="mb-2 flex px-4">
          <Link
            href="/"
            className="flex cursor-pointer select-none items-center gap-2"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-950 text-xs font-semibold leading-none text-white">
              ص
            </div>
            <span className="flex-grow text-xl font-bold">صرف</span>
          </Link>

          <div className="flex-1" />

          <IconButton
            className="text-zinc-300 hover:text-zinc-500"
            size="small"
            name={showSettings ? 'close' : 'settings'}
            onClick={() => setShowSettings(!showSettings)}
          />
        </div>

        <div
          className={twMerge(
            cx(
              'flex h-0 flex-col overflow-auto',
              showSettings ? 'flex-grow' : 'flex-grow-0',
            ),
          )}
          style={{ transition: 'flex-grow 250ms' }}
        >
          <div className="ml-4 mr-2 flex flex-1 flex-col gap-2 rounded-lg bg-white p-4 pb-16 sm:pb-4">
            <h2 className="text-sm font-bold">Settings</h2>
            <Settings />
          </div>
        </div>

        <div
          className={twMerge(
            cx(
              'flex h-0 flex-col overflow-auto',
              showSettings ? 'flex-grow-0' : 'flex-grow',
            ),
          )}
          style={{ transition: 'flex-grow 250ms' }}
        >
          <div className="flex flex-1 flex-col gap-2 px-4 pb-16 sm:pb-0">
            {Object.entries(verbTypes).map(([type, chapters]) => (
              <SidebarGroup
                key={type}
                name={type}
                href={`/${type}`}
                pathname={pathname}
                items={chapters.map((chapter) => ({
                  href: `/${chapter.key}`,
                  pathname: pathname,
                  pre: chapter.form,
                  children: chapter.name,
                }))}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
