'use client'

import { useSuspenseQuery } from '@apollo/client/react'

import TOKEN_BALANCE from '@/lib/api/queries/tokenBalance'

import IOTASymbol from './ui/IOTASymbol'

interface ITokenBalanceProps {
  hasIOTAMark?: boolean
}

const TokenBalance = ({
  hasIOTAMark: withIOTAMark = true
}: ITokenBalanceProps) => {
  const { data } = useSuspenseQuery(TOKEN_BALANCE)

  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      {withIOTAMark && <IOTASymbol size={32} />}
      {data.tokenBalance}
    </span>
  )
}

export default TokenBalance
