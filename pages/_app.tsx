import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import Island from '@/components/Island'
import { Noto_Sans_Arabic } from 'next/font/google'
import { SarfContext } from '@/contexts/SarfProvider'
import Sidebar from '@/components/Sidebar'
import cx from 'classix'
import { useRouter } from 'next/router'
import { useState } from 'react'

const notoSansArabic = Noto_Sans_Arabic({ subsets: ['arabic'] })

const App = ({ Component, pageProps }: AppProps) => {
  const [sarfType, setSarfType] = useState('صرف كبير')
  const [verbCase, setVerbCase] = useState<string | null>(null)
  const [passive, setPassive] = useState(false)

  const router = useRouter()

  const { type, chapter } = router.query

  return (
    <SarfContext.Provider
      value={{
        verbType: !type ? null : String(type),
        verbChapter: !chapter ? null : String(chapter),
        verbCase,
        sarfType,
        passive,
      }}
    >
      <div
        className={cx(
          notoSansArabic.className,
          'flex h-full overflow-hidden bg-zinc-50 p-2 text-zinc-900',
        )}
      >
        <main dir="rtl" className="relative flex-grow rounded-lg bg-white p-4">
          <div className="absolute inset-0 overflow-auto">
            <Component {...pageProps} />
          </div>

          <Island
            sarfType={sarfType}
            verbCase={verbCase}
            passive={passive}
            setSarfType={setSarfType}
            setVerbCase={setVerbCase}
            setPassive={setPassive}
          />
        </main>

        <Sidebar />
      </div>
    </SarfContext.Provider>
  )
}

export default App
