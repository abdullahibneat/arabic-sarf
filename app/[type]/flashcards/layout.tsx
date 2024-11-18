import verbTypes from '@/data'

export const generateStaticParams = () => {
  const routes: Array<{ type: string }> = []
  verbTypes.forEach((_, type) => routes.push({ type }))
  return routes
}

const Layout = ({ children }: { children: React.ReactNode }) => children

export default Layout
