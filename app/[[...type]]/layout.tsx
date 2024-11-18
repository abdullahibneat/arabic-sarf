import { Metadata } from 'next'
import generateMetadataFromParams from '@/helpers/generateMetadataFromParams'
import verbTypes from '@/data'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Record<string, string>>
}): Promise<Metadata> => {
  return generateMetadataFromParams({ params })
}

export const generateStaticParams = () => {
  const routes: Array<{ type: Array<string> | undefined }> = [
    { type: undefined },
  ]
  verbTypes.forEach((_, type) => routes.push({ type: [type] }))
  return routes
}

const Layout = ({ children }: { children: React.ReactNode }) => children

export default Layout
