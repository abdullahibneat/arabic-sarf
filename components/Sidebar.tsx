import Link from 'next/link'
import Settings from './Settings'
import SidebarItem from './SidebarItem'
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
      className="flex w-0 shrink-0 flex-col md:w-[280px] [&.open]:w-[280px]"
      style={{ transition: 'width 250ms, padding 250ms' }}
    >
      <div className="flex w-[280px] flex-1 flex-col gap-2 py-4">
        <div dir="rtl" className="flex px-4">
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

          <button
            className="text-zinc-300 hover:text-zinc-500"
            onClick={() => setShowSettings(!showSettings)}
          >
            {showSettings ? '×' : '⚙'}
          </button>
        </div>

        <div
          className={twMerge(
            cx('h-0 overflow-auto', showSettings ? 'flex-grow' : 'flex-grow-0'),
          )}
          style={{ transition: 'flex-grow 250ms' }}
        >
          <div className="ml-4 mr-2 flex flex-col gap-2 rounded-lg bg-white p-4 pb-12 sm:pb-4">
            <h2 className="text-sm font-bold">Settings</h2>
            <Settings />
          </div>
        </div>

        <div
          className={twMerge(
            cx('h-0 overflow-auto', showSettings ? 'flex-grow-0' : 'flex-grow'),
          )}
          style={{ transition: 'flex-grow 250ms' }}
        >
          <ul className="flex flex-col gap-2 pb-12 pl-4 pr-2 sm:pb-0">
            {Object.entries(verbTypes).map(([type, chapters]) => (
              <li key={type} className="flex flex-col gap-2">
                <SidebarItem href={`/${type}`} pathname={pathname}>
                  {type}
                </SidebarItem>

                <ul className="flex flex-col gap-2">
                  {chapters.map((chapter) => {
                    return (
                      <li key={chapter.form}>
                        <SidebarItem
                          href={`/${chapter.key}`}
                          pathname={pathname}
                        >
                          {`${chapter.form} - ${chapter.name}`}
                        </SidebarItem>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
