import { useRouter } from 'next/router'

const Type = () => {
  const { type } = useRouter().query
  return (
    <div className="p-4">
      <h1>{type}</h1>
    </div>
  )
}

export default Type
