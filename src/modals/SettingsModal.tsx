import '../styles/SettingsModal.scss'

import { useCallback, useMemo } from 'preact/hooks'

import AppState from '../AppState'
import Flex from '../components/Flex'
import IconButton from '../components/IconButton'
import Segmented from '../components/Segmented'
import Text from '../components/Text'
import useAppState from '../hooks/useAppState'
import verbTypes from '../../data'

const SettingsModal = () => {
  const { settings } = useAppState()

  const verbTypeOptions = Object.keys(verbTypes).map((verbType) => ({
    key: verbType,
    name: verbType,
    value: !settings.hiddenVerbTypes.includes(verbType),
  }))

  const mujarradChapterHeadingsOptions = useMemo(
    () =>
      [
        { label: 'Arabic (ن, ض, ف)', value: 'arabic' },
        { label: 'English (1a, 1b, 1c)', value: 'english' },
      ] as const,
    [],
  )

  const mazeedFihiChapterHeadingsOptions = useMemo(
    () =>
      [
        { label: 'English (2,3,4)', value: 'english' },
        { label: 'Roman (II, III, IV)', value: 'roman' },
      ] as const,
    [],
  )

  const booleanOptions = useMemo(
    () =>
      [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ] as const,
    [],
  )

  const tasreefOptions = [
    { key: 'showNasb', name: 'Nasb', value: settings.showNasb },
    { key: 'showJazm', name: 'Jazm', value: settings.showJazm },
    { key: 'showAmr', name: 'Amr', value: settings.showAmr },
    { key: 'showMajhool', name: 'Majhool', value: settings.showMajhool },
  ]

  const toggleVerbType = useCallback((verbType: string, enable: boolean) => {
    const newSettings = AppState.getItem('settings')

    const hide = !enable
    const currentlyHidden = newSettings.hiddenVerbTypes.includes(verbType)

    if (enable && currentlyHidden) {
      newSettings.hiddenVerbTypes = newSettings.hiddenVerbTypes.filter(
        (type) => type !== verbType,
      )
    } else if (hide && !currentlyHidden) {
      newSettings.hiddenVerbTypes.push(verbType)
    }

    AppState.setItem('settings', newSettings)
  }, [])

  return (
    <Flex column gap={12} width={400} padding={24} paddingTop={12}>
      <Flex column gap={4}>
        <Text>Verb types</Text>
        <div class="table">
          {verbTypeOptions.map((option) => (
            <Row {...option} onChange={toggleVerbType} />
          ))}
        </div>
      </Flex>

      <Flex column gap={4}>
        <Text>Mujarrad chapter headings</Text>
        <Segmented
          value={settings.mujarradChapterHeadings}
          options={mujarradChapterHeadingsOptions}
          onChange={({ value }) =>
            AppState.setItem('settings', {
              ...settings,
              mujarradChapterHeadings: value,
            })
          }
        />
      </Flex>

      <Flex column gap={4}>
        <Text>Mazeed Fihi chapter headings</Text>
        <Segmented
          value={settings.mazeedFihiChapterHeadings}
          options={mazeedFihiChapterHeadingsOptions}
          onChange={({ value }) =>
            AppState.setItem('settings', {
              ...settings,
              mazeedFihiChapterHeadings: value,
            })
          }
        />
      </Flex>

      <Flex column gap={4}>
        <Text>Edit root letters</Text>
        <Segmented
          value={settings.showRootLettersEditor}
          options={booleanOptions}
          onChange={({ value }) =>
            AppState.setItem('settings', {
              ...settings,
              showRootLettersEditor: value,
            })
          }
        />
      </Flex>

      <Flex column gap={4}>
        <Text>Show sarf sagheer</Text>
        <Segmented
          value={settings.showSarfSagheer}
          options={booleanOptions}
          onChange={({ value }) =>
            AppState.setItem('settings', {
              ...settings,
              showSarfSagheer: value,
            })
          }
        />
      </Flex>

      <Flex column gap={4}>
        <Text>Tasreef group mode</Text>
        <Flex justifyContent="center" alignItems="center" gap={16} flex={1}>
          <IconButton
            active={settings.tasreefGroupMode === 'by-person'}
            name="group-by-person"
            color={
              settings.tasreefGroupMode === 'by-person'
                ? 'text'
                : 'text-secondary'
            }
            onClick={() =>
              AppState.setItem('settings', {
                ...settings,
                tasreefGroupMode: 'by-person',
              })
            }
          />
          <IconButton
            active={settings.tasreefGroupMode === 'by-gender'}
            name="group-by-gender"
            color={
              settings.tasreefGroupMode === 'by-gender'
                ? 'text'
                : 'text-secondary'
            }
            onClick={() =>
              AppState.setItem('settings', {
                ...settings,
                tasreefGroupMode: 'by-gender',
              })
            }
          />
          <IconButton
            active={settings.tasreefGroupMode === 'list'}
            name="list"
            color={
              settings.tasreefGroupMode === 'list' ? 'text' : 'text-secondary'
            }
            onClick={() =>
              AppState.setItem('settings', {
                ...settings,
                tasreefGroupMode: 'list',
              })
            }
          />
        </Flex>

        <Flex column gap={4}>
          <Text>Tasreef options</Text>
          <div class="table">
            {tasreefOptions.map((option) => (
              <Row
                {...option}
                onChange={(property, value) =>
                  AppState.setItem('settings', {
                    ...settings,
                    [property]: value,
                  })
                }
              />
            ))}
          </div>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SettingsModal

const Row = ({
  key,
  name,
  value = false,
  onChange,
}: {
  key: string
  name: string
  value?: boolean
  onChange?: (name: string, value: boolean) => void
}) => (
  <div class="table-row" onClick={() => onChange?.(key, !value)}>
    <div>{name}</div>
    <div>
      <input
        type="checkbox"
        name={name}
        checked={value}
        onChange={() => onChange?.(key, !value)}
      />
    </div>
  </div>
)
