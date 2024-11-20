import { Metadata } from 'next'
import generateMetadataFromParams from '@/helpers/generateMetadataFromParams'
import toEnglishVerbType from '@/helpers/toEnglishVerbType'
import verbTypes from '@/data'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Record<string, string>>
}): Promise<Metadata> => {
  return generateMetadataFromParams({ params })
}

export const generateStaticParams = () => {
  const routes: Array<{ type: string; chapter: string }> = []
  verbTypes.forEach((chapters, type) => {
    chapters.forEach((_, chapter) =>
      routes.push({ type: toEnglishVerbType(type), chapter }),
    )
  })
  return routes
}

const Layout = ({ children }: { children: React.ReactNode }) => children

export default Layout
