import { SarfSagheer as SarfSagheerType } from '@/hooks/useSarfSagheers'
import replaceRoots from '@/helpers/replaceRoots'
import { useMemo } from 'react'
import useSarf from '@/hooks/useSarf'

export type SarfSagheerProps = {
  sarfSagheer: SarfSagheerType | null
  defaultRootLetters?: { ف?: string; ع?: string; ل?: string } | null
}

const SarfSagheer = ({ sarfSagheer, defaultRootLetters }: SarfSagheerProps) => {
  const { rootLetters } = useSarf()

  const data = useMemo(() => {
    if (!sarfSagheer?.مصدر) return null
    return replaceRoots(sarfSagheer, rootLetters || defaultRootLetters)
  }, [sarfSagheer, rootLetters, defaultRootLetters])

  return (
    <div className="flex flex-shrink-0 flex-col items-center justify-center rounded-md border-[1px] border-zinc-300 px-4 py-2">
      {!data && <div>N/A</div>}

      {data && (
        <>
          <p>
            {data.معروف.ماضي} {data.معروف.مضارع} {data.مصدر} فهو{' '}
            {data.معروف.فاعل}
          </p>

          {data?.مجهول && (
            <p>
              و {data.مجهول.ماضي} {data.مجهول.مضارع} {data.مصدر} فهو{' '}
              {data.مجهول.مفعول}
            </p>
          )}

          <p>
            الأمر منه {data.أمر} و النّهي عنه لا {data.نهي}
          </p>
        </>
      )}
    </div>
  )
}

export default SarfSagheer
