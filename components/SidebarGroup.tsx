import SidebarItem, { SidebarItemProps } from './SidebarItem'

import Icon from './Icon'
import IconButton from './IconButton'
import cx from 'classix'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'

type SidebarGroupProps = {
  name: string
  href: string
  pathname?: string
  items?: SidebarItemProps[]
}

const SidebarGroup = ({ name, href, pathname, items }: SidebarGroupProps) => {
  const [open, setOpen] = useState(true)

  return (
    <div onClick={() => setOpen(true)}>
      <SidebarItem
        href={href}
        pathname={pathname}
        pre={
          <IconButton
            size="small"
            name="chevron"
            rotate={open ? 0 : 180}
            onClick={(e) => {
              e.preventDefault()
              setOpen(!open)
            }}
          />
        }
      >
        {name}
      </SidebarItem>

      <div
        className={twMerge(
          cx('grid grid-rows-[0fr]', open && 'grid-rows-[1fr]'),
        )}
        style={{ transition: 'grid-template-rows 250ms' }}
      >
        <div className="flex flex-col overflow-hidden">
          {items?.map((item, index) => (
            <div key={item.href} className="flex gap-2 pr-4">
              <div className="flex-1 py-1">
                <SidebarItem {...item} />
              </div>

              <div
                className={twMerge(
                  cx(
                    'flex flex-col border-r-[1px] border-transparent',
                    index !== items.length - 1 && 'border-zinc-300',
                  ),
                )}
              >
                <div className="mr-[-1px] w-2 flex-1 rounded-br border-b-[1px] border-r-[1px] border-zinc-300" />
                <div className="flex-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SidebarGroup
