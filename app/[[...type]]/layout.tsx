import { Metadata } from 'next'
import generateMetadataFromParams from '@/helpers/generateMetadataFromParams'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Record<string, string>>
}): Promise<Metadata> => {
  return generateMetadataFromParams({ params })
}

const Layout = ({ children }: { children: React.ReactNode }) => children

export default Layout
