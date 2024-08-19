import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en" className="flex h-full flex-col">
      <Head />
      <body className="flex h-full flex-col overflow-y-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
