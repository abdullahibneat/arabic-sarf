import { MouseEventHandler, useCallback, useState } from 'react'
import SidebarItem, { SidebarItemProps } from './SidebarItem'

import IconButton from './IconButton'
import cx from 'classix'
import { twMerge } from 'tailwind-merge'

type SidebarGroupProps = {
  name: string
  href: string
  pathname?: string
  items?: SidebarItemProps[]
}

const SidebarGroup = ({ name, href, pathname, items }: SidebarGroupProps) => {
  const [isOpen, setIsOpen] = useState(true)

  const open = useCallback(() => setIsOpen(true), [])

  const toggleOpen = useCallback<MouseEventHandler<HTMLButtonElement>>((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen((open) => !open)
  }, [])

  return (
    <div onClick={open}>
      <SidebarItem
        href={href}
        pathname={pathname}
        pre={
          <IconButton
            size="small"
            name="chevron"
            rotate={isOpen ? 0 : 180}
            onClick={toggleOpen}
          />
        }
      >
        {name}
      </SidebarItem>

      <div
        className={twMerge(
          cx('grid grid-rows-[0fr]', isOpen && 'grid-rows-[1fr]'),
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
                    index !== items.length - 1 &&
                      'border-zinc-300 dark:border-neutral-500',
                  ),
                )}
              >
                <div className="mr-[-1px] w-2 flex-1 rounded-br border-b-[1px] border-r-[1px] border-zinc-300 dark:border-neutral-500" />
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
