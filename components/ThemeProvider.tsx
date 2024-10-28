import { useEffect, useState } from 'react'

import { themeAtom } from '@/atoms'
import { useAtom } from 'jotai'
import useMatchMedia from '@/hooks/useMatchMedia'

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)

  const [theme] = useAtom(themeAtom)
  const systemPrefersDark = useMatchMedia('(prefers-color-scheme: dark)')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const dark = theme === 'dark' || (theme === 'system' && systemPrefersDark)
    window.document.documentElement.classList.toggle('dark', dark)
  }, [theme, systemPrefersDark])

  if (!mounted) {
    return null
  }

  return children
}

export default ThemeProvider
