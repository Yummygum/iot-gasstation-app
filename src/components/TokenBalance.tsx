'use client'
import { useQuery } from '@apollo/client/react'

import { useApolloSubscription } from '@/hooks/useApolloSubscription'
import GET_SPONSOR_WALLET from '@/lib/api/queries/getSponsorWallet'
import SPONSOR_WALLET_UPDATES_SUBSCRIPTION from '@/lib/api/subscriptions/sponsorWalletUpdates'

import IOTAAmount from './IOTAAmount'
import { Skeleton } from './ui/skeleton'

interface ITokenBalanceProps {
  hasIOTAMark?: boolean
}

const TokenBalance = ({ hasIOTAMark = true }: ITokenBalanceProps) => {
  const { data, subscribeToMore, loading, dataState } =
    useQuery(GET_SPONSOR_WALLET)

  useApolloSubscription({
    subscribeToMore,
    document: SPONSOR_WALLET_UPDATES_SUBSCRIPTION,
    onUpdate: (prev, update) => ({
      ...prev,
      tokenBalance: update.tokenBalanceUpdates.balance
    })
  })

  return loading || dataState === 'empty' ? (
    <Skeleton className="h-5 w-full bg-white/75" />
  ) : (
    <IOTAAmount
      amount={data?.getSponsorWallet?.balance}
      hasIOTAMark={hasIOTAMark}
      size="sm"
    />
  )
}

export default TokenBalance
