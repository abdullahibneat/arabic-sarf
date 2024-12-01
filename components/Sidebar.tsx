import Link from 'next/link'
import SidebarGroup from './SidebarGroup'
import toEnglishVerbType from '@/helpers/toEnglishVerbType'
import { usePathname } from 'next/navigation'
import useVerbTypes from '@/hooks/useVerbTypes'

const Sidebar = () => {
  const verbTypes = useVerbTypes()

  const pathname = usePathname()

  return (
    <aside
      className="flex w-0 shrink-0 flex-col [&.open]:w-72"
      style={{ transition: 'width 250ms, padding 250ms' }}
    >
      <div className="flex w-72 flex-1 flex-col pt-4">
        <div dir="rtl" className="mb-2 flex px-4">
          <Link
            href="/"
            className="flex cursor-pointer select-none items-center gap-2"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-xs font-semibold leading-none text-white">
              ص
            </div>
            <span className="flex-grow text-xl font-bold">صرف</span>
          </Link>
        </div>

        <div className="flex h-0 flex-grow flex-col overflow-auto">
          <div className="flex flex-1 flex-col gap-2 px-4 pb-16">
            {Object.entries(verbTypes).map(([type, chapters]) => (
              <SidebarGroup
                key={type}
                name={type}
                href={`/${toEnglishVerbType(type)}`}
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
