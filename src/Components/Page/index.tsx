import { ComponentChildren } from 'preact'
import Header from '../Header'
import Navbar from '../Navbar'
import { JSX } from 'preact/jsx-runtime'

type Props = {
  style?: JSX.CSSProperties
  children: ComponentChildren
}

const Page = ({ style, children }: Props) => (
  <div
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: 16,
    }}
  >
    <Header />
    <Navbar />
    <div style={style}>{children}</div>
  </div>
)

export default Page
