import { useFragment } from '@apollo/client/react'

import { graphql } from '@/lib/api/graphql'
import { formatDatabaseDateToDay } from '@/lib/utils/formatDateToDay'

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
}

const GroupBudgetBar = ({ groupId }: GroupBudgetBarProps) => {
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
      value:
        formatDatabaseDateToDay(data.estimatedDepletionDate as string) ||
        'Unknown'
    }
  ]

  return (
    <BudgetBar
      groupId={groupId}
      loading={dataState !== 'complete'}
      values={values}
    />
  )
}

export default GroupBudgetBar
