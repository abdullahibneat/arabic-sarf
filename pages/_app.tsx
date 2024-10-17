import '@/styles/globals.css'

import { Modal, ModalContext } from '@/contexts/ModalContext'
import { Noto_Sans, Noto_Sans_Arabic } from 'next/font/google'
import { fontSizeAtom, themeAtom } from '@/atoms'
import { useCallback, useEffect, useState } from 'react'

import type { AppProps } from 'next/app'
import Island from '@/components/Island'
import { SarfContext } from '@/contexts/SarfContext'
import Sidebar from '@/components/Sidebar'
import { createPortal } from 'react-dom'
import { useAtom } from 'jotai'
import useMatchMedia from '@/hooks/useMatchMedia'
import { useRouter } from 'next/router'

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  adjustFontFallback: false,
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
})

const App = ({ Component, pageProps }: AppProps) => {
  const [sarfType, setSarfType] = useState('صرف كبير')
  const [verbCase, setVerbCase] = useState<string | null>(null)
  const [passive, setPassive] = useState(false)
  const [rootLetters, setRootLetters] = useState<{
    ف?: string
    ع?: string
    ل?: string
  } | null>(null)

  const [modals, setModals] = useState<Modal[]>([])

  const [theme] = useAtom(themeAtom)
  const [fontSize] = useAtom(fontSizeAtom)

  const router = useRouter()

  const { type, chapter } = router.query

  const systemPrefersDark = useMatchMedia('(prefers-color-scheme: dark)')

  /**
   * Dark mode
   */
  useEffect(() => {
    const dark = theme === 'dark' || (theme === 'system' && systemPrefersDark)
    window.document.documentElement.classList.toggle('dark', dark)
  }, [theme, systemPrefersDark])

  /**
   * Modal helpers
   */

  const getDialog = useCallback((id: string) => {
    return document.querySelector<HTMLDialogElement>(`dialog#${id}`)
  }, [])

  const presentModal = useCallback((modal: Modal) => {
    setModals((modals) => modals.concat(modal))
    setTimeout(() => getDialog(modal.id)?.showModal(), 0)
    return () => dismissModal(modal.id)
  }, [])

  const dismissModal = useCallback((id: string) => {
    const dialog = getDialog(id)
    dialog?.classList.add('close')
    setTimeout(() => {
      getDialog(id)?.close()
      setModals((modals) => modals.filter((modal) => modal.id !== id))
    }, 250)
  }, [])

  /**
   * End of modal helpers
   */

  return (
    <ModalContext.Provider
      value={{ present: presentModal, dismiss: dismissModal }}
    >
      <SarfContext.Provider
        value={{
          verbType: !type ? null : String(type),
          verbChapter: !chapter ? null : String(chapter),
          verbCase,
          sarfType,
          passive,
          rootLetters,
        }}
      >
        <style jsx global>{`
          html {
            font-family: ${notoSansArabic.style.fontFamily},
              ${notoSans.style.fontFamily}, sans-serif;
            font-size: ${fontSize}px;
          }
        `}</style>

        <div className="flex h-full overflow-hidden bg-zinc-50 p-2 text-zinc-900 dark:bg-neutral-800 dark:text-neutral-100">
          <main
            dir="rtl"
            className="relative z-[1] w-0 flex-grow rounded-lg bg-white p-4 dark:bg-neutral-900"
          >
            <div className="absolute inset-0 overflow-auto">
              <Component {...pageProps} />
            </div>

            <Island
              sarfType={sarfType}
              verbCase={verbCase}
              passive={passive}
              rootLetters={rootLetters}
              setSarfType={setSarfType}
              setVerbCase={setVerbCase}
              setPassive={setPassive}
              setRootLetters={setRootLetters}
            />
          </main>

          <Sidebar />
        </div>

        {modals.map((modal) =>
          createPortal(
            <dialog
              id={modal.id}
              onCancel={() => dismissModal(modal.id)}
              className="m-0 h-full max-h-full w-full max-w-full items-center justify-center open:flex"
            >
              {modal.content}
            </dialog>,
            document.body,
            modal.id,
          ),
        )}
      </SarfContext.Provider>
    </ModalContext.Provider>
  )
}

export default App
