import React from 'react'
import cx from 'classix'
import { twMerge } from 'tailwind-merge'

const Dialog = React.forwardRef<
  HTMLDialogElement,
  React.DetailedHTMLProps<
    React.DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  >
>(({ className, children, ...props }, ref) => (
  <dialog
    ref={ref}
    {...props}
    className={twMerge(
      cx(
        'm-0 h-full max-h-full w-full max-w-full items-center justify-center open:flex',
        className,
      ),
    )}
  >
    {children}
  </dialog>
))

Dialog.displayName = 'Modal'

export default Dialog
