'use client'

import { useFragment } from '@apollo/client/react'

import { graphql } from '@/lib/api/graphql'
import { formatEstimatedDepletionDate } from '@/lib/utils/dateUtils'

import BudgetBar from './BudgetBar'
import { BudgetBarItemProps } from './BudgetBarItem'

interface DashboardBudgetBarProps {
  isLoading: boolean
  sponsorWalletId?: string
}

export const DASHBOARD_BUDGET_BAR_FRAGMENT = graphql(`
  fragment DashboardBudgetBarFragment on SponsorWalletDto {
    estimatedRemainingTransactions
    estimatedDepletionDate
  }
`)

const DashboardBudgetBar = ({
  isLoading,
  sponsorWalletId
}: DashboardBudgetBarProps) => {
  const { data } = useFragment({
    fragment: DASHBOARD_BUDGET_BAR_FRAGMENT,
    from: {
      __typename: 'SponsorWalletDto',
      sponsorWalletId
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
      value: formatEstimatedDepletionDate(data.estimatedDepletionDate as string)
    }
  ]

  return <BudgetBar isLoading={isLoading} values={values} />
}

export default DashboardBudgetBar
