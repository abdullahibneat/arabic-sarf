import { ComponentChildren, JSX } from 'preact'

import { CSSProperties } from 'preact/compat'
import { useMemo } from 'preact/hooks'

export type TextProps = {
  type?: keyof typeof types
  color?: 'white' | 'text' | 'text' | 'text-secondary' | 'hover' | 'border'
  style?: JSX.CSSProperties
  children: ComponentChildren
}

const Text = ({ type, color = 'text', style = {}, children }: TextProps) => {
  const textStyles = useMemo(() => (type ? types[type] : {}), [type])

  return (
    <div
      style={{
        color: `var(--${color})`,
        ...style,
        ...textStyles,
      }}
    >
      {children}
    </div>
  )
}

export default Text

const types: Record<
  'h1' | 'h2' | 'bold' | 'small' | 'small-bold',
  CSSProperties
> = {
  h1: {
    fontSize: 36,
    fontWeight: 700,
    lineHeight: '40px',
  },
  h2: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '32px',
  },
  bold: {
    fontWeight: 700,
  },
  small: {
    fontSize: 14,
    lineHeight: '24px',
  },
  'small-bold': {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '24px',
  },
}
