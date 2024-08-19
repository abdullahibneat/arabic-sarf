'use client'

import React, { useMemo } from 'react'

import Link from 'next/link'
import cx from 'classix'

type SidebarItemProps = {
  href: string
  pathname?: string
  children: React.ReactNode
}

const SidebarItem = ({ href, pathname = '', children }: SidebarItemProps) => {
  const isActive = useMemo(() => decodeURI(pathname) === href, [pathname, href])

  return (
    <Link
      href={href}
      draggable={false}
      className={cx(
        'flex h-8 select-none items-center rounded-md border border-transparent px-2 font-medium',
        isActive && 'border-zinc-300 bg-white',
        !isActive && 'hover:border-zinc-300 hover:bg-zinc-100',
      )}
    >
      {children}
    </Link>
  )
}

export default SidebarItem
