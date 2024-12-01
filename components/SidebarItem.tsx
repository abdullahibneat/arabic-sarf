import React, { useMemo } from 'react'

import Link from 'next/link'
import cx from 'classix'

export type SidebarItemProps = {
  sticky?: boolean
  href: string
  pathname?: string
  pre?: React.ReactNode
  children: React.ReactNode
}

const SidebarItem = ({
  sticky,
  href,
  pathname = '',
  pre,
  children,
}: SidebarItemProps) => {
  const isActive = useMemo(() => pathname === href, [pathname, href])

  return (
    <Link
      dir="rtl"
      href={href}
      draggable={false}
      className={cx(
        'flex h-9 select-none items-center rounded-md border border-transparent bg-zinc-50 px-2 font-medium dark:bg-neutral-800',
        sticky && 'sticky top-0 z-10',
        isActive &&
          'border-zinc-300 bg-white dark:border-neutral-500 dark:bg-neutral-600',
        !isActive &&
          'hover:border-zinc-300 hover:bg-zinc-100 active:bg-zinc-200 dark:hover:border-neutral-500 dark:hover:bg-neutral-700 dark:active:bg-neutral-600',
      )}
      style={{ transition: 'background-color 250ms, border-color 250ms' }}
    >
      <div className="relative flex gap-3">
        {pre && (
          <div className="flex w-4 items-center justify-center">
            <span className="absolute text-center">{pre}</span>
          </div>
        )}
        {children}
      </div>
    </Link>
  )
}

export default SidebarItem
