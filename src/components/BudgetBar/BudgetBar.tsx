'use client'

import { quickHash } from '@/lib/utils/quickHash'

import AllocateFundsDialog from '../AllocateFundsDialog'
import { Button } from '../ui/button'
import { Item, ItemActions, ItemContent } from '../ui/item'
import { Skeleton } from '../ui/skeleton'
import BudgetBarItem, { BudgetBarItemProps } from './BudgetBarItem'

interface BudgetBarProps {
  groupId?: string
  isLoading: boolean
  values: BudgetBarItemProps[]
}

const BudgetBar = ({ groupId, isLoading, values }: BudgetBarProps) => {
  return (
    <Item
      className="rounded-2xl p-8 [background:linear-gradient(89deg,rgba(198,230,251,0.20)1.28%,rgba(181,210,251,0.20)50.75%,rgba(163,189,251,0.20)100.22%)]"
      variant="muted"
    >
      <ItemContent className="flex h-full flex-row items-stretch gap-10">
        {!isLoading &&
          values.map((value, idx) => (
            <BudgetBarItem
              isLast={idx === values.length - 1}
              key={quickHash(value.title)}
              title={value.title}
              value={value.value}
            />
          ))}

        {isLoading &&
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              className="flex w-full flex-col items-start gap-x-10 gap-y-1"
              key={quickHash(`skeleton-${idx}`)}
            >
              <Skeleton className="bg-primary/10 h-4 w-5/6" key={`${idx}-1`} />
              <Skeleton className="bg-primary/10 h-6 w-2/3" key={`${idx}-2`} />
            </div>
          ))}
      </ItemContent>
      <ItemActions>
        {groupId && (
          <AllocateFundsDialog groupId={groupId}>
            <Button disabled={isLoading} size="sm" variant="default">
              Allocate budget
            </Button>
          </AllocateFundsDialog>
        )}
      </ItemActions>
    </Item>
  )
}

export default BudgetBar
