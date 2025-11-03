'use client'
import { useSubscription } from '@apollo/client/react'

import BudgetBar from '@/components/BudgetBar/BudgetBar'
import IOTAAmount from '@/components/IOTAAmount'
import NotifyItem from '@/components/NotifyItem'
import SpendingSummary from '@/components/SpendingSummary/SpendingSummary'
import { Item } from '@/components/ui/item'
import TOKEN_BALANCE_SUBSCRIPTION from '@/lib/api/subscriptions/tokenBalance'

const Dashboard = () => {
  const { data } = useSubscription(TOKEN_BALANCE_SUBSCRIPTION)

  return (
    <div className="flex w-full flex-col gap-10 px-4 py-8">
      <Item variant="outline">
        <div>Data: {JSON.stringify(data, null, 2)}</div>
      </Item>

      <BudgetBar />

      <SpendingSummary />

      <NotifyItem
        className="max-w-md"
        onClick={() => {}}
        title="Mint.fun has spent more than usual today"
      >
        <p>
          Your average daily spend has been <IOTAAmount amount={100} /> over the
          past 30 days. Today, it has spent <IOTAAmount amount={10} />.
        </p>
      </NotifyItem>
    </div>
  )
}

export default Dashboard
