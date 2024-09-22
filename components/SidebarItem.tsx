'use client'

import React, { useMemo } from 'react'

import Link from 'next/link'
import cx from 'classix'

export type SidebarItemProps = {
  href: string
  pathname?: string
  pre?: React.ReactNode
  children: React.ReactNode
}

const SidebarItem = ({
  href,
  pathname = '',
  pre,
  children,
}: SidebarItemProps) => {
  const isActive = useMemo(() => decodeURI(pathname) === href, [pathname, href])

  return (
    <Link
      dir="rtl"
      href={href}
      draggable={false}
      className={cx(
        'flex h-9 select-none items-center rounded-md border border-transparent px-2 font-medium',
        isActive && 'border-zinc-300 bg-white',
        !isActive && 'hover:border-zinc-300 hover:bg-zinc-100',
      )}
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
