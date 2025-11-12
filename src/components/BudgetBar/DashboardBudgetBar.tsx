import { useSuspenseFragment } from '@apollo/client/react'

import { graphql } from '@/lib/api/graphql'
import { formatDatabaseDateToDay } from '@/lib/utils/formatDateToDay'

import BudgetBar from './BudgetBar'
import { BudgetBarItemProps } from './BudgetBarItem'

const DASHBOARD_BUDGET_BAR_FRAGMENT = graphql(`
  fragment DashboardBudgetBarFragment on SponsorWalletDto {
    estimatedRemainingTransactions
    estimatedDepletionDate
  }
`)

const DashboardBudgetBar = () => {
  const { data } = useSuspenseFragment({
    fragment: DASHBOARD_BUDGET_BAR_FRAGMENT,
    from: {
      __typename: 'SponsorWalletDto'
    }
  })

  const values: BudgetBarItemProps[] = [
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

  return <BudgetBar loading={false} values={values} />
}

export default DashboardBudgetBar
