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
  animationDelay?: number
}

const Flashcard = React.forwardRef<HTMLDivElement, FlashcardProps>(
  (
    { className, term, animationDelay = 0, children, ...props }: FlashcardProps,
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
          ),
        )}
        style={{
          ...props.style,
          animation: 'card-drop 750ms ease-out forwards',
          animationDelay: `${animationDelay}ms`,
          // Match initial translate value from `card-drop` animation.
          // This is so that cards are off-screen from the start
          translate: '0 -100vh',
        }}
      >
        {children}

        <div
          className="absolute inset-0 flex flex-col overflow-auto bg-neutral-800 text-neutral-100 dark:bg-zinc-50 dark:text-zinc-900"
          style={{
            clipPath: `circle(${expanded ? 150 : 0}% at calc(100% - 32px) calc(100% - 32px))`,
            transition: 'clip-path 250ms',
          }}
        >
          {term}
        </div>

        <IconButton
          name={expanded ? 'close' : 'book'}
          className="absolute bottom-4 right-4 bg-zinc-300 dark:bg-neutral-600"
          onClick={toggle}
        />
      </div>
    )
  },
)

Flashcard.displayName = 'Flashcard'

export default Flashcard
