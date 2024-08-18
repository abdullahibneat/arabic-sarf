import { useRouter } from 'next/router'

const Chapter = () => {
  const { type, chapter } = useRouter().query
  return (
    <h1>
      {type} - {chapter}
    </h1>
  )
}

export default Chapter
