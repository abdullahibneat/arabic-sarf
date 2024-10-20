import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import Segmented, { SegmentedOption } from './Segmented'
import {
  enabledVerbTypesAtom,
  fontSizeAtom,
  mazeedFihiNumberingAtom,
  mujarradHeadingsAtom,
  showJazmAtom,
  showMajhoolAtom,
  showMazeedFihiAtom,
  showMushtaqqAtom,
  showNasbAtom,
  showRootLetterEditorAtom,
  showSarfSahegerAtom,
  tasreefDisplayModeAtom,
  themeAtom,
} from '@/atoms'
import usePresets, { presets } from '@/hooks/usePresets'

import Radio from './Radio'
import posthog from 'posthog-js'
import { useAtom } from 'jotai'
import verbTypes from '@/data'

const Settings = () => {
  const [previewFontSize, setPreviewFontSize] = useState(0)

  const [theme, setTheme] = useAtom(themeAtom)
  const [tasreefDisplayMode, setTasreefDisplayMode] = useAtom(
    tasreefDisplayModeAtom,
  )
  const [fontSize, setFontSize] = useAtom(fontSizeAtom)
  const [mujarradHeadings, setMujarradHeadings] = useAtom(mujarradHeadingsAtom)
  const [mazeedFihiNumbering, setMazeedFihiNumbering] = useAtom(
    mazeedFihiNumberingAtom,
  )
  const [enabledVerbTypes, setEnabledVerbTypes] = useAtom(enabledVerbTypesAtom)
  const [showMazeedFihi, setShowMazeedFihi] = useAtom(showMazeedFihiAtom)
  const [showSarfSaheger, setShowSarfSaheger] = useAtom(showSarfSahegerAtom)
  const [showMushtaqq, setShowMushtaqq] = useAtom(showMushtaqqAtom)
  const [showNasb, setShowNasb] = useAtom(showNasbAtom)
  const [showJazm, setShowJazm] = useAtom(showJazmAtom)
  const [showMajhool, setShowMajhool] = useAtom(showMajhoolAtom)
  const [showRootLetterEditor, setShowRootLetterEditor] = useAtom(
    showRootLetterEditorAtom,
  )

  const { preset, setPreset } = usePresets()

  useEffect(() => {
    setPreviewFontSize(fontSize)
  }, [fontSize])

  const handleTasreefDisplayModeChange = useCallback(
    (option: SegmentedOption<string>) => {
      setTasreefDisplayMode(option.id)
      posthog.capture('Tasreef Display Mode Changed', {
        tasreefDisplayMode: option.id,
      })
    },
    [],
  )

  const handleFontSizeChange = useCallback(() => {
    setFontSize(previewFontSize)
    posthog.capture('Font Size Changed', { fontSize: previewFontSize })
  }, [previewFontSize])

  const handlePresetChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      setPreset(e.target.value)
      posthog.capture('Preset Changed', { preset: e.target.value })
    },
    [],
  )

  const handleMujarradHeadingChange = useCallback(
    (option: SegmentedOption<string>) => {
      setMujarradHeadings(option.id)
      posthog.capture('Mujarrad Headings Changed', {
        mujarradHeadings: option.id,
      })
    },
    [],
  )

  const handleMazeedFihiNumberingChange = useCallback(
    (option: SegmentedOption<string>) => {
      setMazeedFihiNumbering(option.id)
      posthog.capture('Mazeed Fihi Numbering Changed', {
        mazeedFihiNumbering: option.id,
      })
    },
    [],
  )

  const toggleVerbType = useCallback(
    (verbType: string) => () =>
      setEnabledVerbTypes((prev) => {
        const enabled = prev.includes(verbType)
        let newEnabledVerbTypes = prev

        if (enabled) {
          newEnabledVerbTypes = prev.filter((v) => v !== verbType)
        } else {
          newEnabledVerbTypes = prev.concat(verbType)
        }

        posthog.capture('Enabled Verb Types changed', {
          verbType,
          action: enabled ? 'Disabled' : 'Enabled',
          enabledVerbTypes: newEnabledVerbTypes,
        })

        return newEnabledVerbTypes
      }),
    [],
  )

  const handleMazeedFihiEnabledChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setShowMazeedFihi(e.target.checked)
    posthog.capture('Show Mazeed Fihi Changed', {
      showMazeedFihi: e.target.checked,
    })
  }, [])

  const handleSarfSagheerEnabledChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setShowSarfSaheger(e.target.checked)
    posthog.capture('Show Sarf Sagheer Changed', {
      showSarfSaheger: e.target.checked,
    })
  }, [])

  const handleMushtaqqEnabledChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setShowMushtaqq(e.target.checked)
    posthog.capture('Show Mushtaqq Changed', {
      showMushtaqq: e.target.checked,
    })
  }, [])

  const handleNasbEnabledChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setShowNasb(e.target.checked)
    posthog.capture('Show Nasb Changed', { showNasb: e.target.checked })
  }, [])

  const handleJazmEnabledChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setShowJazm(e.target.checked)
    posthog.capture('Show Jazm Changed', { showJazm: e.target.checked })
  }, [])

  const handleMajhoolEnabledChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setShowMajhool(e.target.checked)
    posthog.capture('Show Majhool Changed', { showMajhool: e.target.checked })
  }, [])

  const handleShowRootLetterEditorChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setShowRootLetterEditor(e.target.checked)
    posthog.capture('Show Root Letters Editor Changed', {
      showRootLetterEditor: e.target.checked,
    })
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <FieldWrapper title="Theme">
        <Segmented
          options={
            [
              { id: 'system', label: 'System' },
              { id: 'light', label: 'Light' },
              { id: 'dark', label: 'Dark' },
            ] as const
          }
          selectedId={theme}
          onSelectOption={(option) => setTheme(option.id)}
        />
      </FieldWrapper>

      <FieldWrapper title="Tasreef display mode">
        <Segmented
          options={[
            { id: 'list', icon: 'list' },
            { id: 'by-person', icon: 'group-by-person' },
            { id: 'by-gender', icon: 'group-by-gender' },
          ]}
          selectedId={tasreefDisplayMode}
          onSelectOption={handleTasreefDisplayModeChange}
        />
      </FieldWrapper>

      <FieldWrapper title={`Font size (${previewFontSize}px)`}>
        <div
          className="flex flex-shrink-0 flex-col items-center justify-center rounded-md border-[1px] border-zinc-300 px-4 py-2 dark:border-neutral-500"
          style={{ fontSize: previewFontSize }}
        >
          نَصَرَ يَنْصَرَ نَصْرًا
        </div>

        <input
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 dark:bg-neutral-700"
          type="range"
          min={8}
          max={32}
          value={previewFontSize}
          onChange={(e) => setPreviewFontSize(parseInt(e.target.value))}
          onMouseUp={handleFontSizeChange}
          onTouchEnd={handleFontSizeChange}
        />
      </FieldWrapper>

      <FieldWrapper title="Presets">
        <select
          className="w-full rounded-md border-[1px] border-zinc-300 bg-zinc-200 px-1 text-sm dark:border-neutral-500 dark:bg-neutral-700"
          value={preset}
          onChange={handlePresetChange}
        >
          {presets.map((preset) => (
            <option key={preset.name} value={preset.name}>
              {preset.name}
            </option>
          ))}
          {preset === 'Custom' && <option value="Custom">Custom</option>}
        </select>
      </FieldWrapper>

      <FieldWrapper title="Mujarrad headings">
        <Radio
          name="mujarrad-headings"
          options={[
            { id: 'arabic', label: 'Arabic (ن، ض، ف)' },
            { id: 'english', label: 'English (1a, 1b, 1c)' },
          ]}
          selectedId={mujarradHeadings}
          onSelectOption={handleMujarradHeadingChange}
        />
      </FieldWrapper>

      <FieldWrapper title="Mazeed fihi numbering">
        <Radio
          name="mazeed-fihi-numbering"
          options={[
            { id: 'english', label: 'English (2, 3, 4)' },
            { id: 'roman', label: 'Roman (II, III, IV)' },
          ]}
          selectedId={mazeedFihiNumbering}
          onSelectOption={handleMazeedFihiNumberingChange}
        />
      </FieldWrapper>

      <FieldWrapper title="Verb types">
        <div>
          {Array.from(verbTypes.keys()).map((verbType) => (
            <div key={verbType} className="flex items-center gap-2">
              <label
                dir="rtl"
                className="w-full select-none"
                htmlFor={`settings-${verbType}`}
              >
                {verbType}
              </label>
              <input
                id={`settings-${verbType}`}
                type="checkbox"
                className="accent-zinc-900 dark:accent-neutral-300"
                checked={enabledVerbTypes.includes(verbType)}
                onChange={toggleVerbType(verbType)}
              />
            </div>
          ))}
        </div>
      </FieldWrapper>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label
            htmlFor="settings-mazeed-fihi"
            className="flex-1 select-none text-sm"
          >
            Enable Mazeed Fihi
          </label>
          <input
            id="settings-mazeed-fihi"
            type="checkbox"
            className="accent-zinc-900 dark:accent-neutral-300"
            checked={showMazeedFihi}
            onChange={handleMazeedFihiEnabledChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="settings-sarf-saheger"
            className="flex-1 select-none text-sm"
          >
            Enable Sarf Saheger
          </label>
          <input
            id="settings-sarf-saheger"
            type="checkbox"
            className="accent-zinc-900 dark:accent-neutral-300"
            checked={showSarfSaheger}
            onChange={handleSarfSagheerEnabledChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="settings-mushtaqq"
            className="flex-1 select-none text-sm"
          >
            Enable Mushtaqq
          </label>
          <input
            id="settings-mushtaqq"
            type="checkbox"
            className="accent-zinc-900 dark:accent-neutral-300"
            checked={showMushtaqq}
            onChange={handleMushtaqqEnabledChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label htmlFor="settings-nasb" className="flex-1 select-none text-sm">
            Enable Nasb
          </label>
          <input
            id="settings-nasb"
            type="checkbox"
            className="accent-zinc-900 dark:accent-neutral-300"
            checked={showNasb}
            onChange={handleNasbEnabledChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="settings-jazm" className="flex-1 select-none text-sm">
            Enable Jazm
          </label>
          <input
            id="settings-jazm"
            type="checkbox"
            className="accent-zinc-900 dark:accent-neutral-300"
            checked={showJazm}
            onChange={handleJazmEnabledChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="settings-majhool"
            className="flex-1 select-none text-sm"
          >
            Enable Majhool
          </label>
          <input
            id="settings-majhool"
            type="checkbox"
            className="accent-zinc-900 dark:accent-neutral-300"
            checked={showMajhool}
            onChange={handleMajhoolEnabledChange}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="settings-root-letter-editor"
          className="flex-1 select-none text-sm"
        >
          Edit Root Letters
        </label>
        <input
          id="settings-root-letter-editor"
          type="checkbox"
          className="accent-zinc-900 dark:accent-neutral-300"
          checked={showRootLetterEditor}
          onChange={handleShowRootLetterEditorChange}
        />
      </div>
    </div>
  )
}

export default Settings

const FieldWrapper = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col items-center gap-2">
    <p className="self-stretch text-sm text-zinc-500 dark:text-neutral-200">
      {title}
    </p>
    {children}
  </div>
)
