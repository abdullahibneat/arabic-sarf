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

export const SWIPER_BATCH_SIZE = 10

const Swiper = <T extends { key: string }>({
  className,
  items,
  renderItem,
}: SwiperProps<T>) => {
  const [index, setIndex] = useState(0)

  /**
   * Ensure only 10 items are rendered at a time
   */
  const batchItems = useMemo(() => {
    if (items.length <= 1) return items

    const currentItem = items.at(index) ?? items[0]
    const currentIndex = items.indexOf(currentItem)
    const previousItem = items.at(currentIndex - 1)

    const nextItems = [currentItem]

    let i = currentIndex + 1

    while (nextItems.length < SWIPER_BATCH_SIZE - 1) {
      const next = items.at(i++ % items.length)
      if (!next || next === currentItem) break
      nextItems.push(next)
    }

    if (previousItem) nextItems.push(previousItem)

    return nextItems
  }, [items, index])

  const next = useCallback(() => {
    setIndex((index) => index + 1)
  }, [])

  const prev = useCallback(() => {
    setIndex((index) => index - 1)
  }, [])

  return (
    <div className={className}>
      <IconButton name="chevron" rotate={-90} onClick={next} />

      <div className="grid h-full w-full place-items-center items-center">
        {batchItems.map((item, i) => (
          <Swipeable
            key={item.key}
            item={item}
            zIndex={batchItems.length - i}
            renderItem={renderItem}
            onSwipe={next}
          />
        ))}
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
