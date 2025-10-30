'use client'

import type { VariantProps } from 'class-variance-authority'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const toggleVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-4 w-7',
        md: 'h-6 w-11',
        lg: 'h-7 w-12'
      },
      variant: {
        default:
          'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        success:
          'data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-input',
        warning:
          'data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-input',
        destructive:
          'data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-input'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default'
    }
  }
)

const toggleThumbVariants = cva(
  'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
  {
    variants: {
      size: {
        sm: 'h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0',
        md: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

export interface ToggleProps
  extends ComponentProps<typeof SwitchPrimitive.Root>,
    VariantProps<typeof toggleVariants> {}

const Toggle = ({ className, size, variant, ...props }: ToggleProps) => (
  <SwitchPrimitive.Root
    className={cn(toggleVariants({ size, variant, className }))}
    {...props}
  >
    <SwitchPrimitive.Thumb className={cn(toggleThumbVariants({ size }))} />
  </SwitchPrimitive.Root>
)

export { Toggle }
