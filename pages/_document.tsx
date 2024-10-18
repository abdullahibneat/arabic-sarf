import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html
      lang="en"
      className="flex h-full flex-col bg-zinc-50 p-2 text-zinc-900 dark:bg-neutral-800 dark:text-neutral-100"
    >
      <Head />
      <body className="flex h-full flex-col overflow-y-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
