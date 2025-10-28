'use client'
import { useSubscription } from '@apollo/client/react'
import { UserIcon } from 'lucide-react'

import IOTAAmount from '@/components/IOTAAmount'
import NotifyItem from '@/components/NotifyItem'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'
import TOKEN_BALANCE_SUBSCRIPTION from '@/lib/api/subscriptions/tokenBalance'

const Dashboard = () => {
  const { data } = useSubscription(TOKEN_BALANCE_SUBSCRIPTION)

  return (
    <div className="w-full px-4 py-8">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserIcon />
          </EmptyMedia>
          <EmptyTitle>No clients</EmptyTitle>
          <EmptyDescription>No clients found</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <pre>Data: {JSON.stringify(data, null, 2)}</pre>
        </EmptyContent>
      </Empty>

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
