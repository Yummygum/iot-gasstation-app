'use client'

import { useMemo } from 'react'

import { GetSponsorWalletQuery } from '@/lib/api/queries/getSponsorWallet'
import { formatEstimatedDepletionDate } from '@/lib/utils/dateUtils'

import BudgetBar from './BudgetBar'
import { BudgetBarItemProps } from './BudgetBarItem'

interface DashboardBudgetBarProps {
  isLoading: boolean
  walletData?: GetSponsorWalletQuery['getSponsorWallet']
}

const DashboardBudgetBar = ({
  walletData,
  isLoading
}: DashboardBudgetBarProps) => {
  const values: BudgetBarItemProps[] = useMemo(
    () => [
      {
        title: 'Est. remaining transactions',
        isLast: false,
        value: walletData?.estimatedRemainingTransactions ?? 'Unknown'
      },
      {
        title: 'Est. date of running out',
        isLast: true,
        value: formatEstimatedDepletionDate(
          walletData?.estimatedDepletionDate as string
        )
      }
    ],
    [
      walletData?.estimatedRemainingTransactions,
      walletData?.estimatedDepletionDate
    ]
  )

  return <BudgetBar isLoading={isLoading} values={values} />
}

export default DashboardBudgetBar
