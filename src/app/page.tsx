'use client'
import { useSubscription } from '@apollo/client/react'

import BudgetBar from '@/components/BudgetBar'
import ExampleChart from '@/components/Chart/ExampleChart'
import IOTAAmount from '@/components/IOTAAmount'
import NotifyItem from '@/components/NotifyItem'
import { Item } from '@/components/ui/item'
import TOKEN_BALANCE_SUBSCRIPTION from '@/lib/api/subscriptions/tokenBalance'

const Dashboard = () => {
  const { data } = useSubscription(TOKEN_BALANCE_SUBSCRIPTION)

  return (
    <div className="flex w-full flex-col gap-10 px-4 py-8">
      <Item variant="outline">
        <pre>Data: {JSON.stringify(data, null, 2)}</pre>
      </Item>

      <BudgetBar />

      <ExampleChart />

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
