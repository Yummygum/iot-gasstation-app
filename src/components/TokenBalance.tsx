'use client'

import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/client/react'

const GET_TOKEN_BALANCE = gql`
  query GetTokenBalance {
    tokenBalance
  }
`

interface TokenBalanceData {
  tokenBalance: string | number
}

const TokenBalance = () => {
  const { data } = useSuspenseQuery<TokenBalanceData>(GET_TOKEN_BALANCE)

  return (
    <div className="mb-4 rounded bg-gray-100 p-4">
      <h2 className="text-lg font-semibold">Token Balance</h2>
      <p>{data?.tokenBalance}</p>
    </div>
  )
}

export default TokenBalance
