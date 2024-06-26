import '../styles/SettingsModal.scss'

import AppState, { AppStateType } from '../AppState'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

import Flex from '../components/Flex'
import IconButton from '../components/IconButton'
import { JSX } from 'preact'
import Segmented from '../components/Segmented'
import Text from '../components/Text'
import useAppState from '../hooks/useAppState'
import verbTypes from '../../data'

const SettingsModal = () => {
  const { settings, fontSize, arabicFont, theme } = useAppState()

  const [preset, setPreset] = useState('Custom')

  useEffect(() => {
    presetsLoop: for (const [presetName, preset] of Object.entries(presets)) {
      for (const [key, value] of Object.entries(preset)) {
        if (key === 'tasreefGroupMode') {
          continue
        }

        if (Array.isArray(value)) {
          if (
            JSON.stringify(value.sort()) !==
            JSON.stringify(Array.from(settings[key]).sort())
          ) {
            continue presetsLoop
          }
        } else {
          if (value !== settings[key]) {
            continue presetsLoop
          }
        }
      }
      setPreset(presetName)
      return
    }

    setPreset('Custom')
  }, [settings, settings.hiddenVerbTypes])

  const themeOptions = useMemo(
    () =>
      [
        { label: 'System', value: 'system' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ] as const,
    [],
  )

  const arabicFonts = useMemo<AppStateType['arabicFont'][]>(
    () => [
      'System',
      'Noto Sans Arabic',
      'KFGQPC Uthman Taha Naskh',
      'KFGQPC Uthmanic Script Hafs',
    ],
    [],
  )

  const presetNames = useMemo(() => Object.keys(presets).concat('Custom'), [])

  const verbTypeOptions = useMemo(
    () =>
      Array.from(verbTypes.keys()).map((type) => ({
        key: type,
        name: type,
        value: !settings.hiddenVerbTypes.includes(type),
      })),
    [settings.hiddenVerbTypes],
  )

  const mujarradChapterHeadingsOptions = useMemo(
    () =>
      [
        { label: 'English (1a, 1b, 1c)', value: 'english' },
        { label: 'Arabic (ن, ض, ف)', value: 'arabic' },
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

  const tasreefOptions = useMemo(
    () => [
      { key: 'showNasb', name: 'Nasb', value: settings.showNasb },
      { key: 'showJazm', name: 'Jazm', value: settings.showJazm },
      { key: 'showAmr', name: 'Amr', value: settings.showAmr },
      { key: 'showMajhool', name: 'Majhool', value: settings.showMajhool },
    ],
    [
      settings.showNasb,
      settings.showJazm,
      settings.showAmr,
      settings.showMajhool,
    ],
  )

  const onArabicFontChange = useCallback(
    (event: JSX.TargetedEvent<HTMLSelectElement>) => {
      if (event.target instanceof HTMLSelectElement) {
        const arabicFont = event.target.value
        AppState.setItem('arabicFont', arabicFont as AppStateType['arabicFont'])
      }
    },
    [arabicFonts],
  )

  const onPresetChange = useCallback(
    (event: JSX.TargetedEvent<HTMLSelectElement>) => {
      if (event.target instanceof HTMLSelectElement) {
        const presetName = event.target.value
        const preset = presets[presetName]

        if (preset) {
          const currentSettings = AppState.getItem('settings')
          AppState.setItem('settings', {
            ...preset,
            tasreefGroupMode: currentSettings.tasreefGroupMode,
          })
        }

        setPreset(event.target.value)
      }
    },
    [],
  )

  const toggleVerbType = useCallback((type: string, enable: boolean) => {
    const newSettings = AppState.getItem('settings')

    const hide = !enable
    const currentlyHidden = newSettings.hiddenVerbTypes.includes(type)

    if (enable && currentlyHidden) {
      newSettings.hiddenVerbTypes = newSettings.hiddenVerbTypes.filter(
        ($type) => $type !== type,
      )
    } else if (hide && !currentlyHidden) {
      newSettings.hiddenVerbTypes = newSettings.hiddenVerbTypes.concat(type)
    }

    AppState.setItem('settings', newSettings)
  }, [])

  return (
    <Flex column gap={12} padding={24} paddingTop={12}>
      <Flex column gap={4}>
        <Text>Theme</Text>
        <Segmented
          value={theme}
          options={themeOptions}
          onChange={({ value }) => AppState.setItem('theme', value)}
        />
      </Flex>

      <Flex column gap={4}>
        <Text>Tasreef group mode</Text>
        <Flex justifyContent="center" alignItems="center" gap={16} flex={1}>
          <IconButton
            title="By person"
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
            title="By gender"
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
            title="List"
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
      </Flex>

      <Flex column gap={4}>
        <Text>Font size: {fontSize}px</Text>

        <Flex>
          <Flex
            width={32}
            height={32}
            justifyContent="center"
            alignItems="center"
          >
            <p style={{ fontSize: 12, lineHeight: '13px' }}>A</p>
          </Flex>

          <input
            type="range"
            style={{ flex: 1 }}
            min={12}
            max={24}
            value={fontSize}
            onInput={(e) => {
              if (e.target && 'value' in e.target)
                AppState.setItem('fontSize', Number(e.target.value))
            }}
          />

          <Flex
            width={32}
            height={32}
            justifyContent="center"
            alignItems="center"
          >
            <p style={{ fontSize: 16, lineHeight: '16px' }}>A</p>
          </Flex>
        </Flex>

        <Text>Text Preview</Text>

        <div class="sample-text">
          <Text>نَصَرَ يَنْصَرَ نَصْرًا</Text>
        </div>
      </Flex>

      <Flex column gap={4}>
        <Text>Arabic Font</Text>
        <select value={arabicFont} onChange={onArabicFontChange}>
          {arabicFonts.map((arabicFont) => (
            <option key={arabicFont} value={arabicFont}>
              {arabicFont}
            </option>
          ))}
        </select>
      </Flex>

      <Flex column gap={4}>
        <Text>Presets</Text>
        <select value={preset} onChange={onPresetChange}>
          {presetNames.map((preset) => (
            <option key={preset} value={preset}>
              {preset}
            </option>
          ))}
        </select>
      </Flex>

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

      {(settings.showNasb || settings.showJazm) && (
        <Flex column gap={4}>
          <Text>Show لن/لم</Text>
          <Segmented
            value={settings.showNasbJazmParticle}
            options={booleanOptions}
            onChange={({ value }) =>
              AppState.setItem('settings', {
                ...settings,
                showNasbJazmParticle: value,
              })
            }
          />
        </Flex>
      )}
    </Flex>
  )
}

export default SettingsModal

const Row = ({
  key,
  name,
  value = false,
  disabled,
  onChange,
}: {
  key: string
  name: string
  value?: boolean
  disabled?: boolean
  onChange?: (name: string, value: boolean) => void
}) => (
  <div
    class={`table-row ${disabled ? 'disabled' : ''}`}
    onClick={disabled ? undefined : () => onChange?.(key, !value)}
  >
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

const presets: Record<string, AppStateType['settings']> = {
  'Misk - Beginner': {
    hiddenVerbTypes: ['أجوف', 'ناقص', 'مثال', 'مضاعف'],
    mujarradChapterHeadings: 'english',
    mazeedFihiChapterHeadings: 'english',
    showRootLettersEditor: false,
    showSarfSagheer: false,
    showNasb: false,
    showJazm: false,
    showAmr: false,
    showMajhool: false,
    showNasbJazmParticle: false,
    tasreefGroupMode: 'list',
  },
  'Misk - Intermediate': {
    hiddenVerbTypes: [],
    mujarradChapterHeadings: 'english',
    mazeedFihiChapterHeadings: 'english',
    showRootLettersEditor: true,
    showSarfSagheer: true,
    showNasb: true,
    showJazm: true,
    showAmr: true,
    showMajhool: true,
    showNasbJazmParticle: false,
    tasreefGroupMode: 'list',
  },
}
