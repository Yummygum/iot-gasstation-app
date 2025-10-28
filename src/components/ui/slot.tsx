/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Children,
  cloneElement,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  ReactNode
} from 'react'

interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
}

const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (isValidElement(children)) {
      return cloneElement(children as ReactElement<any>, {
        ...props,
        ...(children.props || {}),
        ref
      })
    }

    if (Children.count(children) > 1) {
      Children.only(null)
    }

    return null
  }
)

Slot.displayName = 'Slot'

export { Slot }
