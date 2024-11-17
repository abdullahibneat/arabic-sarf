import React, {
  PointerEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import IconButton from './IconButton'

export type SwiperProps<T extends { key: string }> = {
  className?: string
  items: T[]
  renderItem: SwipeableProps<T>['renderItem']
}

const Swiper = <T extends { key: string }>({
  className,
  items,
  renderItem,
}: SwiperProps<T>) => {
  const [keys, setKeys] = useState<string[]>([])

  useEffect(() => {
    setKeys(items.map((item) => item.key))
  }, [items])

  const next = useCallback(() => {
    setKeys((keys) => {
      const [first, ...rest] = keys
      return rest.concat(first)
    })
  }, [])

  const prev = useCallback(() => {
    setKeys((keys) => {
      const last = keys[keys.length - 1]
      const rest = keys.slice(0, -1)
      return [last, ...rest]
    })
  }, [])

  return (
    <div className={className}>
      <IconButton name="chevron" rotate={-90} onClick={next} />

      <div className="grid h-full w-full place-items-center items-center">
        {items.map((item, i) => {
          const zIndex = keys.toReversed().indexOf(item.key)
          return (
            <Swipeable
              key={`item-${i}`}
              item={item}
              zIndex={zIndex}
              renderItem={renderItem}
              onSwipe={next}
            />
          )
        })}
      </div>

      <IconButton name="chevron" rotate={90} onClick={prev} />
    </div>
  )
}

export default Swiper

type SwipeableProps<T> = {
  item: T
  zIndex: number
  renderItem: (
    ref: React.RefObject<HTMLDivElement>,
    item: T,
    props: {
      onPointerDown: PointerEventHandler
      onPointerMove: PointerEventHandler
      onPointerUp: PointerEventHandler
      onPointerLeave: PointerEventHandler
    },
    zIndex: number,
  ) => React.ReactNode
  onSwipe?: () => void
}

const Swipeable = <T,>({
  item,
  zIndex,
  renderItem,
  onSwipe,
}: SwipeableProps<T>) => {
  const ref = useRef<HTMLDivElement>(null)

  const dragging = useRef(false)
  const start = useRef({ x: 0, y: 0 })

  const elevation = useMemo(() => -Math.min(zIndex, 10) * 1, [zIndex])

  useEffect(() => {
    if (!ref.current) return

    ref.current.style.opacity = '1'
    ref.current.style.zIndex = String(zIndex)
    ref.current.style.transformOrigin = 'center'
    ref.current.style.transition = 'transform 250ms, opacity 250ms'
    ref.current.style.gridRow = '1'
    ref.current.style.gridColumn = '1'
    ref.current.style.transform = `translate(0px, ${elevation}px) rotate(0deg)`
  }, [zIndex])

  const resetPointerState = useCallback(() => {
    if (!ref.current) return

    start.current = { x: 0, y: 0 }
    dragging.current = false

    ref.current.style.opacity = '1'
    ref.current.style.cursor = 'initial'
    ref.current.style.transition = 'transform 250ms, opacity 250ms'
    ref.current.style.transform = `translate(0px, ${elevation}px) rotate(0deg)`
  }, [elevation])

  const onPointerDown = useCallback<PointerEventHandler>((e) => {
    if (!ref.current) return
    dragging.current = true
    start.current = { x: e.clientX, y: e.clientY }
    ref.current.style.cursor = 'grabbing'
    ref.current.style.transition = 'none'
  }, [])

  const onPointerMove = useCallback<PointerEventHandler>(
    (e) => {
      if (!ref.current) return
      if (!dragging.current) return

      const current = { x: e.clientX, y: e.clientY }

      const deltaX = Math.abs(current.x - start.current.x)
      const deltaY = Math.abs(current.y - start.current.y)
      const delta = Math.max(deltaX, deltaY)

      const opacity = 1 - (delta * 0.2) / 100

      ref.current.style.opacity = String(opacity)
      ref.current.style.transform = `translate(${current.x - start.current.x}px, ${current.y - start.current.y + elevation}px) rotate(${(current.x - start.current.x) * 0.01}deg)`
    },
    [elevation],
  )

  const onPointerUp = useCallback<PointerEventHandler>(() => {
    const opacity = Number(ref.current?.style.opacity)
    if (opacity < 0.85) onSwipe?.()
    resetPointerState()
  }, [resetPointerState])

  return renderItem(
    ref,
    item,
    {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerLeave: onPointerUp,
    },
    zIndex,
  )
}
