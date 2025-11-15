'use client'
import { useFragment } from '@apollo/client/react'

import { graphql } from '@/lib/api/graphql'

import IOTAAmount from './IOTAAmount'
import { Skeleton } from './ui/skeleton'

interface ITokenBalanceProps {
  hasIOTAMark?: boolean
}

const SPONSOR_WALLET_FRAGMENT = graphql(`
  fragment SponsorWalletFragment on SponsorWalletDto {
    sponsorWalletId
    balance
  }
`)

const TokenBalance = ({ hasIOTAMark = true }: ITokenBalanceProps) => {
  const { data, dataState } = useFragment({
    fragment: SPONSOR_WALLET_FRAGMENT,
    from: {
      __typename: 'SponsorWalletDto',
      // TODO: adjust this once we have multiple sponsor wallets
      sponsorWalletId: 'sponsor-wallet'
    }
  })

  return dataState !== 'complete' ? (
    <Skeleton className="h-5 w-full bg-white/75" />
  ) : (
    <IOTAAmount amount={data?.balance} hasIOTAMark={hasIOTAMark} size="sm" />
  )
}

export default TokenBalance
