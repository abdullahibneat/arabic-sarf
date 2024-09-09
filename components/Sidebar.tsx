import {
  enabledVerbTypesAtom,
  mazeedFihiNumberingAtom,
  mujarradHeadingsAtom,
  showMazeedFihiAtom,
} from '@/atoms'

import Link from 'next/link'
import Settings from './Settings'
import SidebarItem from './SidebarItem'
import cx from 'classix'
import replaceRoots from '@/helpers/replaceRoots'
import toRoman from '@/helpers/toRoman'
import { twMerge } from 'tailwind-merge'
import { useAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import verbTypes from '@/data'

const Sidebar = () => {
  const [showSettings, setShowSettings] = useState(false)

  const [mujarradHeadings] = useAtom(mujarradHeadingsAtom)
  const [mazeedFihiNumbering] = useAtom(mazeedFihiNumberingAtom)
  const [enabledVerbTypes] = useAtom(enabledVerbTypesAtom)
  const [showMazeedFihi] = useAtom(showMazeedFihiAtom)

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
            {Array.from(verbTypes.entries())
              .filter(([type]) => enabledVerbTypes.includes(type))
              .map(([type, value]) => (
                <li key={type} className="flex flex-col gap-2">
                  <SidebarItem href={`/${type}`} pathname={pathname}>
                    {type}
                  </SidebarItem>

                  <ul className="flex flex-col gap-2">
                    {Array.from(value.entries())
                      .filter(([, value]) =>
                        showMazeedFihi ? !!value : value?.form === 1,
                      )
                      .map(([chapter, value], index) => {
                        let form = value?.form || chapter

                        if (value) {
                          if (form === 1) {
                            if (mujarradHeadings === 'english') {
                              form = `1${String.fromCharCode(index + 97)}`
                            } else {
                              form = value.chapter[0]
                            }
                          } else if (mazeedFihiNumbering === 'roman') {
                            form = toRoman(value.form)
                          }
                        }
                        const title = value
                          ? replaceRoots(value, value.root_letters[0].arabic)
                              .title
                          : null
                        return (
                          <li key={chapter}>
                            <SidebarItem
                              href={`/${type}/${chapter}`}
                              pathname={pathname}
                            >
                              {`${form} - ${title}`}
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
