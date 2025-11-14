import { useMemo } from 'react'

import { GetSponsorWalletQuery } from '@/lib/api/queries/getSponsorWallet'

import IOTAAmount from '../IOTAAmount'
import { Item, ItemContent, ItemTitle } from '../ui/item'

interface ISpendingData {
  title: string
  amount: number
  subItems?: Omit<ISpendingData, 'subItems'>[]
}

interface SpendingSummaryProps {
  walletData?: GetSponsorWalletQuery['getSponsorWallet']
  isLoading?: boolean
}

const SpendingSummary = ({ walletData, isLoading }: SpendingSummaryProps) => {
  const spendingData: ISpendingData[] = useMemo(() => {
    const metrics = walletData?.metrics?.allTime

    if (!metrics) {
      return []
    }

    return [
      {
        title: 'Total gas spent',
        amount: metrics.totalSponsoredAmount,
        subItems: [
          {
            title: 'Total transactions',
            amount: metrics.totalTransactions
          },
          {
            title: 'Average per day',
            amount: metrics.averageDailySponsoredAmount
          }
        ]
      },
      {
        title: 'Average transaction fee',
        amount: metrics.averageTransactionFee
      },
      {
        title: 'Daily transaction rate',
        amount: metrics.averageDailyTransactions
      }
    ]
  }, [walletData])

  if (isLoading) {
    return (
      <Item variant="outline">
        <ItemContent className="h-fit">
          <ItemTitle className="text-lg">All time</ItemTitle>
          <p className="text-muted-foreground text-sm">Loading...</p>
        </ItemContent>
      </Item>
    )
  }

  if (!spendingData.length) {
    return (
      <Item variant="outline">
        <ItemContent className="h-fit">
          <ItemTitle className="text-lg">All time</ItemTitle>
          <p className="text-muted-foreground text-sm">No data available</p>
        </ItemContent>
      </Item>
    )
  }

  return (
    <Item variant="outline">
      <ItemContent className="h-fit">
        <ItemTitle className="text-lg">All time</ItemTitle>

        {spendingData.map((data) => (
          <div className="py-2" key={data.title}>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span>{data.title}</span>
              </div>
              <IOTAAmount amount={data.amount} hasIOTAMark size="sm" />
            </div>

            {data.subItems &&
              data.subItems.map((subItem) => (
                <div
                  className="text-muted-foreground flex items-center justify-between text-sm"
                  key={subItem.title}
                >
                  <div className="flex items-center gap-2">
                    <span>{subItem.title}</span>
                  </div>
                  <IOTAAmount amount={subItem.amount} hasIOTAMark size="sm" />
                </div>
              ))}
          </div>
        ))}
      </ItemContent>
    </Item>
  )
}

export default SpendingSummary
