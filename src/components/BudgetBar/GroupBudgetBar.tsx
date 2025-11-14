'use client'

import { useFragment } from '@apollo/client/react'

import { graphql } from '@/lib/api/graphql'
import { formatEstimatedDepletionDate } from '@/lib/utils/dateUtils'

import BudgetBar from './BudgetBar'
import { BudgetBarItemProps } from './BudgetBarItem'

const GROUP_BUDGET_BAR_FRAGMENT = graphql(`
  fragment GroupBudgetBarFragment on GroupDto {
    balance
    estimatedRemainingTransactions
    estimatedDepletionDate
  }
`)

interface GroupBudgetBarProps {
  groupId: string
  isLoading: boolean
}

const GroupBudgetBar = ({ groupId, isLoading }: GroupBudgetBarProps) => {
  const { data, dataState } = useFragment({
    fragment: GROUP_BUDGET_BAR_FRAGMENT,
    from: {
      __typename: 'GroupDto',
      groupId
    }
  })

  const values: BudgetBarItemProps[] = [
    {
      title: 'Current balance',
      isLast: false,
      value: data.balance ?? 0
    },
    {
      title: 'Est. remaining transactions',
      isLast: false,
      value: data.estimatedRemainingTransactions ?? 'Unknown'
    },
    {
      title: 'Est. date of running out',
      isLast: true,
      value: formatEstimatedDepletionDate(data.estimatedDepletionDate as string)
    }
  ]

  return (
    <BudgetBar
      groupId={groupId}
      isLoading={dataState !== 'complete' || isLoading}
      values={values}
    />
  )
}

export default GroupBudgetBar
