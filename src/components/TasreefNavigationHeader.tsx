import '../styles/TasreefNavigationHeader.scss'

import { useCallback, useEffect, useMemo } from 'preact/hooks'

import Flex from './Flex'
import IconButton from './IconButton'
import { JSX } from 'preact/jsx-runtime'
import Popover from './Popover'
import RootLettersEditor from './RootLettersEditor'
import Segmented from './Segmented'
import Tabs from './Tabs'
import Text from './Text'
import useAppState from '../hooks/useAppState'
import useChapterStateContext from '../hooks/useChapterState'
import { useSearchParams } from 'react-router-dom'

const TasreefNavigationHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    chapter,
    customRootLetters,
    persistRootLetters,
    setCustomRootLetters,
    togglePersistRootLetters,
  } = useChapterStateContext()

  const { settings } = useAppState()

  const activeTab = searchParams.get('activeTab') || 'معروف'
  const verbCase = searchParams.get('verbCase') || 'مرفوع'

  useEffect(() => {
    if (chapter) {
      document.title = chapter.title
    } else {
      document.title = 'Sarf'
    }
  }, [chapter])

  const showVerbTasreefs = useMemo(
    () => activeTab === 'معروف' || activeTab === 'مجهول',
    [activeTab],
  )

  const tabs = useMemo(() => {
    const $tabs = ['معروف']

    if (settings.showMajhool) $tabs.push('مجهول')
    if (settings.showSarfSagheer) $tabs.push('صرف صغير')

    return $tabs.reverse()
  }, [settings.showMajhool, settings.showSarfSagheer])

  const verbCases = useMemo(() => {
    const $verbCases = ['مرفوع']

    if (settings.showNasb) $verbCases.push('منصوب')
    if (settings.showJazm) $verbCases.push('مجزوم')

    return $verbCases.reverse()
  }, [settings.showNasb, settings.showJazm])

  const onSelectRootLetters = useCallback(
    (event: JSX.TargetedEvent<HTMLSelectElement>) => {
      if (event.target instanceof HTMLSelectElement) {
        const arabic = event.target.value
        const rootLetters = chapter?.root_letters.find(
          ($rootLetters) => $rootLetters.arabic === arabic,
        )
        setCustomRootLetters(
          { ف: arabic[0], ع: arabic[1], ل: arabic[2] },
          rootLetters?.english,
        )
      }
    },
    [chapter],
  )

  return (
    <Flex column gap={16} paddingBottom={16}>
      <Flex column gap={16} paddingTop={16} backgroundColor="var(--white)">
        {chapter && (
          <Flex column alignItems="center">
            <div class="title">
              <Text type="bold">{chapter.title}</Text>

              {settings.showRootLettersEditor && (
                <div class="collapse-icon">
                  <Popover
                    content={
                      <Flex column gap={8} alignItems="center" width={200}>
                        <RootLettersEditor
                          rootLetters={customRootLetters || undefined}
                          mithaal={chapter.type === 'مثال'}
                          ajwaf={chapter.type === 'أجوف'}
                          naqis={chapter.type === 'ناقص'}
                          onChange={setCustomRootLetters}
                        />

                        {chapter.root_letters.length > 0 && (
                          <Flex column alignSelf="stretch">
                            <label for="preset-root-letters">Presets</label>
                            <select
                              id="preset-root-letters"
                              onChange={onSelectRootLetters}
                            >
                              {chapter.root_letters.map(
                                ({ arabic, english }) => (
                                  <option key={arabic} value={arabic}>
                                    {arabic}
                                  </option>
                                ),
                              )}
                            </select>
                          </Flex>
                        )}

                        {customRootLetters && (
                          <div
                            class="reset-root-letters"
                            onClick={() => setCustomRootLetters(null)}
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
                          <label
                            for="persistRootLetters"
                            style={{ userSelect: 'none' }}
                          >
                            Remember root letters
                          </label>
                        </Flex>
                      </Flex>
                    }
                  >
                    {({ visible, setVisible }) => (
                      <IconButton
                        size="micro"
                        name="chevron-down"
                        onClick={() => setVisible(!visible)}
                      />
                    )}
                  </Popover>
                </div>
              )}
            </div>
          </Flex>
        )}

        {tabs.length > 1 && (
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={(activeTab) => {
              searchParams.set('activeTab', activeTab)
              setSearchParams(searchParams)
            }}
          />
        )}
      </Flex>

      {showVerbTasreefs && verbCases.length > 1 && (
        <Flex alignSelf="center">
          <Segmented
            value={verbCase}
            options={verbCases.map((verbCase) => ({
              label: verbCase,
              value: verbCase,
            }))}
            onChange={({ value: verbCase }) => {
              searchParams.set('verbCase', verbCase)
              setSearchParams(searchParams)
            }}
          />
        </Flex>
      )}
    </Flex>
  )
}

export default TasreefNavigationHeader
