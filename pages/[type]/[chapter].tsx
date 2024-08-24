import { useRouter } from 'next/router'

const Chapter = () => {
  const { type, chapter } = useRouter().query
  return (
    <div className="p-4">
      <h1>
        {type} - {chapter}
      </h1>
    </div>
  )
}

export default Chapter
