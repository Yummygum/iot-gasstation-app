import { BadgeAlertIcon, ChevronRightIcon } from 'lucide-react'
import { PropsWithChildren } from 'react'

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from './ui/item'

interface INotifyItemProps extends PropsWithChildren {
  title: string
  className?: string
  onClick?: () => void
}

const NotifyItem = ({
  className,
  onClick,
  title,
  children,
  ...props
}: INotifyItemProps) => {
  const Comp = onClick ? 'button' : 'div'

  return (
    <Item asChild className={className} size="sm" variant="outline" {...props}>
      <Comp onClick={onClick}>
        <ItemMedia>
          <BadgeAlertIcon className="size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription className="block text-left">
            {children}
          </ItemDescription>
        </ItemContent>
        {onClick && (
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        )}
      </Comp>
    </Item>
  )
}

export default NotifyItem
