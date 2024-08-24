import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import Island from '@/components/Island'
import { Noto_Sans_Arabic } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import cx from 'classix'

const notoSansArabic = Noto_Sans_Arabic({ subsets: ['arabic'] })

const App = ({ Component, pageProps }: AppProps) => (
  <div
    className={cx(
      notoSansArabic.className,
      'flex h-full overflow-hidden overflow-x-hidden bg-zinc-50 p-2 text-zinc-900',
    )}
  >
    <main
      dir="rtl"
      className="relative flex-grow overflow-auto rounded-lg bg-white p-4"
    >
      <div className="absolute inset-0">
        <Component {...pageProps} />
      </div>

      <Island />
    </main>

    <Sidebar />
  </div>
)

export default App
