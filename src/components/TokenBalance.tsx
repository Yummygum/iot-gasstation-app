'use client'

import { useSuspenseQuery } from '@apollo/client/react'

import TOKEN_BALANCE from '@/lib/api/queries/tokenBalance'

import IOTAAmount from './IOTAAmount'

interface ITokenBalanceProps {
  hasIOTAMark?: boolean
}

const TokenBalance = ({ hasIOTAMark = true }: ITokenBalanceProps) => {
  const { data } = useSuspenseQuery(TOKEN_BALANCE)

  return (
    <IOTAAmount
      amount={data.tokenBalance}
      hasIOTAMark={hasIOTAMark}
      size="sm"
    />
  )
}

export default TokenBalance
