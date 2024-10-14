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
} from '@/atoms'
import { useEffect, useState } from 'react'
import usePresets, { presets } from '@/hooks/usePresets'

import Radio from './Radio'
import Segmented from './Segmented'
import { useAtom } from 'jotai'
import verbTypes from '@/data'

const Settings = () => {
  const [previewFontSize, setPreviewFontSize] = useState(0)

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

  return (
    <div className="flex flex-col gap-8">
      <FieldWrapper title="Tasreef display mode">
        <Segmented
          options={[
            { id: 'list', icon: 'list' },
            { id: 'by-person', icon: 'group-by-person' },
            { id: 'by-gender', icon: 'group-by-gender' },
          ]}
          selectedId={tasreefDisplayMode}
          onSelectOption={(option) => setTasreefDisplayMode(option.id)}
        />
      </FieldWrapper>

      <FieldWrapper title={`Font size (${previewFontSize}px)`}>
        <div
          className="flex flex-shrink-0 flex-col items-center justify-center rounded-md border-[1px] border-zinc-300 bg-white px-4 py-2"
          style={{ fontSize: previewFontSize }}
        >
          نَصَرَ يَنْصَرَ نَصْرًا
        </div>

        <input
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 accent-zinc-900"
          type="range"
          min={8}
          max={32}
          value={previewFontSize}
          onChange={(e) => setPreviewFontSize(parseInt(e.target.value))}
          onMouseUp={() => setFontSize(previewFontSize)}
          onTouchEnd={() => setFontSize(previewFontSize)}
        />
      </FieldWrapper>

      <FieldWrapper title="Presets">
        <select
          className="w-full rounded-md border-[1px] border-zinc-300 px-1 text-sm"
          value={preset}
          onChange={(e) => setPreset(e.target.value)}
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
          onSelectOption={(option) => setMujarradHeadings(option.id)}
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
          onSelectOption={(option) => setMazeedFihiNumbering(option.id)}
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
                className="accent-zinc-900"
                checked={enabledVerbTypes.includes(verbType)}
                onChange={() =>
                  setEnabledVerbTypes((prev) =>
                    prev.includes(verbType)
                      ? prev.filter((v) => v !== verbType)
                      : [...prev, verbType],
                  )
                }
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
            className="accent-zinc-900"
            checked={showMazeedFihi}
            onChange={(e) => setShowMazeedFihi(e.target.checked)}
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
            className="accent-zinc-900"
            checked={showSarfSaheger}
            onChange={(e) => setShowSarfSaheger(e.target.checked)}
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
            className="accent-zinc-900"
            checked={showMushtaqq}
            onChange={(e) => setShowMushtaqq(e.target.checked)}
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
            className="accent-zinc-900"
            checked={showNasb}
            onChange={(e) => setShowNasb(e.target.checked)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="settings-jazm" className="flex-1 select-none text-sm">
            Enable Jazm
          </label>
          <input
            id="settings-jazm"
            type="checkbox"
            className="accent-zinc-900"
            checked={showJazm}
            onChange={(e) => setShowJazm(e.target.checked)}
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
            className="accent-zinc-900"
            checked={showMajhool}
            onChange={(e) => setShowMajhool(e.target.checked)}
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
          className="accent-zinc-900"
          checked={showRootLetterEditor}
          onChange={(e) => setShowRootLetterEditor(e.target.checked)}
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
    <p className="self-stretch text-sm text-zinc-500">{title}</p>
    {children}
  </div>
)
