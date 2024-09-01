import Link from 'next/link'
import SidebarItem from './SidebarItem'
import replaceRoots from '@/helpers/replaceRoots'
import { usePathname } from 'next/navigation'
import verbTypes from '@/data'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside
      className="flex w-0 shrink-0 flex-col overflow-auto md:w-[280px] [&.open]:w-[280px]"
      style={{ transition: 'width 250ms, padding 250ms' }}
    >
      <div dir="rtl" className="flex w-[280px] flex-col gap-2 p-4">
        <Link href="/" className="flex cursor-pointer select-none gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-950 text-xs font-semibold leading-none text-white">
            ص
          </div>
          <span className="flex-grow text-xl font-bold">صرف</span>
        </Link>

        <ul className="flex flex-col gap-2">
          {Array.from(verbTypes.entries()).map(([type, value]) => (
            <li key={type} className="flex flex-col gap-2">
              <SidebarItem href={`/${type}`} pathname={pathname}>
                {type}
              </SidebarItem>

              <ul className="flex flex-col gap-2">
                {Array.from(value.entries())
                  .filter(([, value]) => value)
                  .map(([chapter, value]) => {
                    const form = value?.form || chapter
                    const title = value
                      ? replaceRoots(value, value.root_letters[0].arabic).title
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
    </aside>
  )
}

export default Sidebar
