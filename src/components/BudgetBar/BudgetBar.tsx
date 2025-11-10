'use client'
import { useFragment } from '@apollo/client/react'
import { graphql } from 'gql.tada'
import { useEffect, useState } from 'react'

import { quickHash } from '@/lib/quickHash'

import AllocateFundsDialog from '../AllocateFundsDialog'
import { Button } from '../ui/button'
import { Item, ItemActions, ItemContent } from '../ui/item'
import { Skeleton } from '../ui/skeleton'
import BudgetBarItem from './BudgetBarItem'

interface BudgetBarProps {
  groupId?: string
}

const BUDGET_BAR_FRAGMENT = graphql(`
  fragment BudgetBarFragment on GroupDto {
    balance
    members
  }
`)

const BudgetBar = ({ groupId }: BudgetBarProps) => {
  const [loading, setLoading] = useState(true)

  const { data } = useFragment({
    fragment: BUDGET_BAR_FRAGMENT,
    from: {
      __typename: 'GroupDto',
      groupId
    }
  })

  const members = data?.members ?? []

  const values = [
    {
      title: 'Current balance',
      value: data.balance ?? 0
    },
    {
      title: 'Est. remaining transactions',
      value: 2929
    },
    {
      title: 'Est. date of running out',
      value: new Date('2025-11-21')
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])

  return (
    <Item
      className="rounded-2xl p-8 [background:linear-gradient(89deg,rgba(198,230,251,0.20)1.28%,rgba(181,210,251,0.20)50.75%,rgba(163,189,251,0.20)100.22%)]"
      variant="muted"
    >
      <ItemContent className="flex h-full flex-row items-stretch gap-10">
        {!loading &&
          values.map((value, idx) => (
            <BudgetBarItem
              isLast={idx === values.length - 1}
              key={quickHash(value.title)}
              title={value.title}
              value={value.value}
            />
          ))}

        {loading &&
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              className="flex w-full flex-col items-start gap-x-10 gap-y-2"
              key={quickHash(`skeleton-${idx}`)}
            >
              <Skeleton className="bg-primary/10 h-4 w-5/6" key={`${idx}-1`} />
              <Skeleton className="bg-primary/10 h-7 w-2/3" key={`${idx}-2`} />
            </div>
          ))}
      </ItemContent>
      <ItemActions>
        {groupId && members.length > 0 && (
          <AllocateFundsDialog groupId={groupId}>
            <Button disabled={loading} size="sm" variant="default">
              Allocate budget
            </Button>
          </AllocateFundsDialog>
        )}
      </ItemActions>
    </Item>
  )
}

export default BudgetBar
