'use client'

import Link from 'next/link'
import React from 'react'
import cx from 'classix'
import { usePathname } from 'next/navigation'

type SidebarItemProps = {
  href: string
  children: React.ReactNode
}

const SidebarItem = ({ href, children }: SidebarItemProps) => {
  const pathname = usePathname()
  const isActive = decodeURI(pathname) === href

  return (
    <Link
      href={href}
      className={cx(
        'flex h-8 items-center rounded-md border border-transparent px-2 font-medium',
        isActive && 'border-zinc-300 bg-white',
        !isActive && 'hover:border-zinc-300 hover:bg-zinc-100',
      )}
    >
      {children}
    </Link>
  )
}

export default SidebarItem
