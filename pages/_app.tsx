import '@/styles/globals.css'

import { Modal, ModalContext } from '@/contexts/ModalContext'
import { Noto_Sans, Noto_Sans_Arabic } from 'next/font/google'
import { fontSizeAtom, themeAtom } from '@/atoms'
import { useCallback, useEffect, useState } from 'react'

import type { AppProps } from 'next/app'
import Dialog from '@/components/Dialog'
import Head from 'next/head'
import Island from '@/components/Island'
import { PostHogProvider } from 'posthog-js/react'
import { SarfContext } from '@/contexts/SarfContext'
import Sidebar from '@/components/Sidebar'
import { createPortal } from 'react-dom'
import posthog from 'posthog-js'
import { useAtom } from 'jotai'
import useHead from '@/hooks/useHead'
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

if (typeof window !== 'undefined') {
  // checks that we are client-side
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
    },
    autocapture: false,
  })
}

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

  const head = useHead()
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
   * Page view tracking
   */
  useEffect(() => {
    const handleRouteChange = () => posthog.capture('$pageview')
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
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
    <PostHogProvider client={posthog}>
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

          <Head>
            <title>{head.title}</title>
            <meta name="description" content={head.description} />

            <meta property="og:title" content={head.title} />
            <meta property="og:description" content={head.description} />
            <meta property="og:image" content={head.image} />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" sizes="48x48" />
            <link
              rel="icon"
              href="/favicon.svg"
              sizes="any"
              type="image/svg+xml"
            />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          </Head>

          <div className="flex h-full overflow-hidden">
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
              <Dialog id={modal.id} onCancel={() => dismissModal(modal.id)}>
                {modal.content}
              </Dialog>,
              document.body,
              modal.id,
            ),
          )}
        </SarfContext.Provider>
      </ModalContext.Provider>
    </PostHogProvider>
  )
}

export default App
