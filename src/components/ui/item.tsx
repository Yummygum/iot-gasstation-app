import type { VariantProps } from 'class-variance-authority'

import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const ItemGroup = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('group/item-group flex flex-col', className)}
      data-slot="item-group"
      role="list"
      {...props}
    />
  )
}

const ItemSeparator = ({
  className,
  ...props
}: ComponentProps<typeof Separator>) => {
  return (
    <Separator
      className={cn('my-0', className)}
      data-slot="item-separator"
      orientation="horizontal"
      {...props}
    />
  )
}

const itemVariants = cva(
  'group/item [a]:hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 [a]:transition-colors flex flex-wrap items-center rounded-2xl border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:ring-[3px]',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-border',
        muted: 'bg-muted/50'
      },
      size: {
        default: 'gap-4 p-4 ',
        sm: 'gap-2.5 px-4 py-3'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const Item = ({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ComponentProps<'div'> &
  // eslint-disable-next-line react/boolean-prop-naming
  VariantProps<typeof itemVariants> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      className={cn(itemVariants({ variant, size, className }))}
      data-size={size}
      data-slot="item"
      data-variant={variant}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "bg-muted size-8 rounded-sm border [&_svg:not([class*='size-'])]:size-4",
        image:
          'size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const ItemMedia = ({
  className,
  variant = 'default',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof itemMediaVariants>) => {
  return (
    <div
      className={cn(itemMediaVariants({ variant, className }))}
      data-slot="item-media"
      data-variant={variant}
      {...props}
    />
  )
}

const ItemContent = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none',
        className
      )}
      data-slot="item-content"
      {...props}
    />
  )
}

const ItemTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex w-fit items-center gap-2 text-sm leading-snug font-medium',
        className
      )}
      data-slot="item-title"
      {...props}
    />
  )
}

const ItemDescription = ({ className, ...props }: ComponentProps<'p'>) => {
  return (
    <div
      className={cn(
        'text-muted-foreground line-clamp-2 text-sm leading-normal font-normal',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      data-slot="item-description"
      {...props}
    />
  )
}

const ItemActions = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex items-center gap-2', className)}
      data-slot="item-actions"
      {...props}
    />
  )
}

const ItemHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className
      )}
      data-slot="item-header"
      {...props}
    />
  )
}

const ItemFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className
      )}
      data-slot="item-footer"
      {...props}
    />
  )
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle
}
