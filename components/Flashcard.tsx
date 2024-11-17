'use client'

import React, { useCallback, useState } from 'react'

import IconButton from './IconButton'
import cx from 'classix'
import { twMerge } from 'tailwind-merge'

export type FlashcardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  term: React.ReactNode
  animateDrop?: boolean
  animationDelay?: number
}

const Flashcard = React.forwardRef<HTMLDivElement, FlashcardProps>(
  (
    {
      className,
      term,
      animateDrop,
      animationDelay = 0,
      children,
      ...props
    }: FlashcardProps,
    ref,
  ) => {
    const [expanded, setExpanded] = useState(false)

    const toggle = useCallback(() => {
      setExpanded((expanded) => !expanded)
    }, [])

    return (
      <div
        ref={ref}
        {...props}
        className={twMerge(
          cx(
            className,
            'flex select-none flex-col overflow-hidden',
            'h-full max-h-96 w-full max-w-80',
            'bg-zinc-100 dark:bg-neutral-800',
            'rounded-lg border-[1px] border-zinc-300 dark:border-neutral-500',
            // Fix for <Swiper /> component not swiping on mobile
            'touch-none',
          ),
        )}
        style={{
          ...props.style,
          animation: animateDrop
            ? 'card-drop 750ms ease-out forwards'
            : undefined,
          animationDelay: animateDrop ? `${animationDelay}ms` : undefined,
          // Match initial translate value from `card-drop` animation.
          // This is so that cards are off-screen from the start
          translate: animateDrop ? '0 -100vh' : undefined,
        }}
      >
        {children}

        <div
          className="absolute inset-0 flex touch-none flex-col overflow-auto bg-neutral-800 text-neutral-100 dark:bg-zinc-50 dark:text-zinc-900"
          style={{
            clipPath: `circle(${expanded ? 150 : 0}% at calc(100% - 32px) calc(100% - 32px))`,
            transition: 'clip-path 250ms',
          }}
        >
          {term}
        </div>

        <IconButton
          name={expanded ? 'close' : 'book'}
          className={twMerge(
            cx(
              'absolute bottom-4 right-4',
              expanded &&
                'text-neutral-100 hover:bg-neutral-700 active:bg-neutral-600 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:active:bg-zinc-300',
            ),
          )}
          onClick={toggle}
        />
      </div>
    )
  },
)

Flashcard.displayName = 'Flashcard'

export default Flashcard
