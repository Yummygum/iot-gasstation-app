'use client'
import { useQuery } from '@apollo/client/react'

import { useApolloSubscription } from '@/hooks/useApolloSubscription'
import TOKEN_BALANCE from '@/lib/api/queries/tokenBalance'
import TOKEN_BALANCE_UPDATES_SUBSCRIPTION from '@/lib/api/subscriptions/tokenBalanceUpdates'

import IOTAAmount from './IOTAAmount'
import { Skeleton } from './ui/skeleton'

interface ITokenBalanceProps {
  hasIOTAMark?: boolean
}

const TokenBalance = ({ hasIOTAMark = true }: ITokenBalanceProps) => {
  const { data, subscribeToMore, loading, dataState } = useQuery(TOKEN_BALANCE)

  useApolloSubscription({
    subscribeToMore,
    document: TOKEN_BALANCE_UPDATES_SUBSCRIPTION,
    onUpdate: (prev, update) => ({
      ...prev,
      tokenBalance: update.tokenBalanceUpdates.balance
    })
  })

  return loading || dataState === 'empty' ? (
    <Skeleton className="h-5 w-full bg-white/75" />
  ) : (
    <IOTAAmount
      amount={data?.tokenBalance}
      hasIOTAMark={hasIOTAMark}
      size="sm"
    />
  )
}

export default TokenBalance
