import Flex from './Flex'
import { JSX } from 'preact/jsx-runtime'
import RootLettersEditor from './RootLettersEditor'
import Text from './Text'
import { useCallback } from 'preact/hooks'
import useChapterStateContext from '../hooks/useChapterState'

const RootLettersEditorModal = () => {
  const {
    rootLetters,
    chapter,
    persistRootLetters,
    setRootLetters,
    togglePersistRootLetters,
  } = useChapterStateContext()

  const onSelectRootLetters = useCallback(
    (event: JSX.TargetedEvent<HTMLSelectElement>) => {
      if (event.target instanceof HTMLSelectElement) {
        const arabic = event.target.value
        const rootLetters = chapter?.root_letters.find(
          ($rootLetters) => asValue($rootLetters.arabic) === arabic,
        )
        if (rootLetters) {
          setRootLetters(rootLetters.arabic, rootLetters.english)
        }
      }
    },
    [chapter],
  )

  if (!chapter) return null

  return (
    <Flex column gap={8} alignItems="center" padding={16}>
      <RootLettersEditor
        rootLetters={rootLetters || undefined}
        mithaal={chapter.type === 'مثال'}
        ajwaf={chapter.type === 'أجوف'}
        naqis={chapter.type === 'ناقص'}
        onChange={setRootLetters}
      />

      {chapter.root_letters.length > 0 && (
        <Flex column alignSelf="stretch">
          <label for="preset-root-letters">Presets</label>
          <select
            id="preset-root-letters"
            value={asValue(rootLetters)}
            onChange={onSelectRootLetters}
          >
            {chapter.root_letters.map(({ arabic }) => (
              <option key={arabic} value={asValue(arabic)}>
                {asValue(arabic)}
              </option>
            ))}
          </select>
        </Flex>
      )}

      {rootLetters && (
        <div
          class="reset-root-letters"
          onClick={() => setRootLetters(chapter.root_letters[0].arabic)}
        >
          <Text type="small">Reset</Text>
        </div>
      )}

      <Flex gap={8} alignItems="center">
        <input
          id="persistRootLetters"
          type="checkbox"
          checked={persistRootLetters}
          onChange={togglePersistRootLetters}
        />
        <label for="persistRootLetters" style={{ userSelect: 'none' }}>
          Remember root letters
        </label>
      </Flex>
    </Flex>
  )
}

export default RootLettersEditorModal

const asValue = (rootLetters: { ف: string; ع: string; ل: string }) =>
  rootLetters.ف + rootLetters.ع + rootLetters.ل
