import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body dir="rtl" className="flex h-screen overflow-y-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
