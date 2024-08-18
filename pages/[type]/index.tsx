import { useRouter } from 'next/router'

const Type = () => {
  const { type } = useRouter().query
  return <h1>{type}</h1>
}

export default Type
