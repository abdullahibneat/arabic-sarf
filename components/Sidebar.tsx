import Link from 'next/link'
import SidebarItem from './SidebarItem'
import { usePathname } from 'next/navigation'
import verbTypes from '@/data'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside
      dir="ltr"
      className="flex w-0 flex-col md:w-[280px] [&.open]:w-[280px]"
      style={{ transition: 'width 250ms, padding 250ms' }}
    >
      <div className="flex w-[280px] flex-col gap-2 overflow-auto p-4">
        <Link href="/" className="flex select-none gap-2" dir="rtl">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-950 text-xs font-semibold leading-none text-white">
            ص
          </div>
          <span className="flex-grow text-xl font-bold">صرف</span>
        </Link>

        <ul className="flex flex-col gap-2" dir="rtl">
          {Array.from(verbTypes.entries()).map(([type, value]) => (
            <li key={type} className="flex flex-col gap-2">
              <SidebarItem href={`/${type}`} pathname={pathname}>
                {type}
              </SidebarItem>

              <ul className="flex flex-col gap-2">
                {Array.from(value.entries()).map(([chapter, value]) => (
                  <li key={chapter}>
                    <SidebarItem
                      key={`${type}-${chapter}`}
                      href={`/${type}/${chapter}`}
                      pathname={pathname}
                    >
                      {`${chapter} - ${value?.title}`}
                    </SidebarItem>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
