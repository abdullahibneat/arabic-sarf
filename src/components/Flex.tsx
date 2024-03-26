import { ComponentChildren, JSX } from 'preact'

export type FlexProps = JSX.DOMCSSProperties & {
  cssText?: string | null
} & {
  id?: string
  class?: string
  className?: string
  column?: boolean
  reverse?: boolean
  children?: ComponentChildren
  onClick?: JSX.MouseEventHandler<HTMLDivElement>
}

const Flex = ({
  id,
  class: classProp,
  className,
  children,
  column = false,
  reverse = false,
  onClick,
  ...props
}: FlexProps) => {
  return (
    <div
      id={id}
      class={classProp}
      className={className}
      style={{
        ...props,
        display: 'flex',
        flexDirection: column
          ? reverse
            ? 'column-reverse'
            : 'column'
          : reverse
            ? 'row-reverse'
            : 'row',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Flex
