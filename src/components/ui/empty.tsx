import type { VariantProps } from 'class-variance-authority'

import { cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const Empty = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12',
        className
      )}
      data-slot="empty"
      {...props}
    />
  )
}

const EmptyHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex max-w-sm flex-col items-center gap-2 text-center',
        className
      )}
      data-slot="empty-header"
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  'mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6"
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const EmptyMedia = ({
  className,
  variant = 'default',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) => {
  return (
    <div
      className={cn(emptyMediaVariants({ variant, className }))}
      data-slot="empty-icon"
      data-variant={variant}
      {...props}
    />
  )
}

const EmptyTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('text-lg font-medium tracking-tight', className)}
      data-slot="empty-title"
      {...props}
    />
  )
}

const EmptyDescription = ({ className, ...props }: ComponentProps<'p'>) => {
  return (
    <div
      className={cn(
        'text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      data-slot="empty-description"
      {...props}
    />
  )
}

const EmptyContent = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance',
        className
      )}
      data-slot="empty-content"
      {...props}
    />
  )
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
}
