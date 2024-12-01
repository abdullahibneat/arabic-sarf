'use client'

import '@/styles/globals.css'

import { Modal, ModalContext } from '@/contexts/ModalContext'
import { Noto_Sans, Noto_Sans_Arabic } from 'next/font/google'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { useParams, usePathname } from 'next/navigation'

import Dialog from '@/components/Dialog'
import GlobalSearch from '@/components/GlobalSearch'
import PageHeader from '@/components/PageHeader'
import PosthogPageViewTracker from '@/posthog/PosthogPageViewTracker'
import PosthogProvider from '@/posthog/PosthogProvider'
import { SarfContext } from '@/contexts/SarfContext'
import SarfIsland from '@/components/SarfIsland'
import Sidebar from '@/components/Sidebar'
import ThemeProvider from '@/components/ThemeProvider'
import { fontSizeAtom } from '@/atoms'
import { useAtom } from 'jotai'

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  adjustFontFallback: false,
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
})

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [sarfType, setSarfType] = useState('صرف كبير')
  const [verbCase, setVerbCase] = useState<string>('مرفوع')
  const [passive, setPassive] = useState(false)
  const [rootLetters, setRootLetters] = useState<{
    ف?: string
    ع?: string
    ل?: string
  } | null>(null)

  const [modals, setModals] = useState<Modal[]>([])

  const [fontSize] = useAtom(fontSizeAtom)

  const { type, chapter } = useParams()

  const pathname = usePathname()

  /**
   * Service Worker
   */
  useEffect(() => {
    if (
      'serviceWorker' in navigator &&
      process.env.NODE_ENV !== 'development'
    ) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope,
          )
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [])

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
    <html
      className="flex h-full flex-col overflow-hidden bg-zinc-50 p-2 text-zinc-900 dark:bg-neutral-800 dark:text-neutral-100"
      style={{
        fontFamily: `${notoSansArabic.style.fontFamily}, ${notoSans.style.fontFamily}, sans-serif`,
        fontSize,
      }}
    >
      <body className="flex h-full overflow-hidden">
        <Suspense>
          <PosthogProvider>
            <ThemeProvider>
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
                  <main
                    dir="rtl"
                    className="relative flex w-0 flex-grow flex-col rounded-lg bg-white dark:bg-neutral-900"
                  >
                    <PageHeader />

                    <div className="absolute inset-0 overflow-auto">
                      {children}
                    </div>

                    {!pathname.endsWith('/flashcards') && (
                      <SarfIsland
                        sarfType={sarfType}
                        verbCase={verbCase}
                        passive={passive}
                        rootLetters={rootLetters}
                        setSarfType={setSarfType}
                        setVerbCase={setVerbCase}
                        setPassive={setPassive}
                        setRootLetters={setRootLetters}
                      />
                    )}
                  </main>

                  <Sidebar />

                  {modals.map((modal) => (
                    <Dialog
                      key={modal.id}
                      id={modal.id}
                      onCancel={(e) => {
                        e.preventDefault()
                        dismissModal(modal.id)
                      }}
                    >
                      {modal.content}
                    </Dialog>
                  ))}

                  <GlobalSearch />

                  <PosthogPageViewTracker />
                </SarfContext.Provider>
              </ModalContext.Provider>
            </ThemeProvider>
          </PosthogProvider>
        </Suspense>
      </body>
    </html>
  )
}

export default RootLayout
