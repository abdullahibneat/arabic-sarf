import Tasreef from '@/components/Tasreef'
import { useRouter } from 'next/router'
import useSarfKabeers from '@/hooks/useSarfKabeers'

const Chapter = () => {
  const { type, chapter } = useRouter().query

  const { simpleSarfKabeers } = useSarfKabeers()

  const tasreef = simpleSarfKabeers.length === 0 ? null : simpleSarfKabeers[0]

  return (
    <div className="p-4">
      <div className="flex flex-col gap-1">
        {!tasreef && <div>Not found</div>}

        {tasreef && (
          <>
            <h2>
              {type} - {chapter}
            </h2>

            <div className="flex gap-1">
              <Tasreef name="ماضي" tasreef={tasreef?.ماضي} mode="list" />
              <Tasreef name="مضارع" tasreef={tasreef?.مضارع} mode="list" />
              <Tasreef name="أمر" tasreef={tasreef?.أمر} mode="list" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Chapter
