import { graphql, ResultOf, VariablesOf } from 'gql.tada'

import BALANCE_FRAGMENT from '../fragments/balance'

const GET_CLIENT = graphql(`
  query GetClient($clientId: UUID!) {
    getClient(clientId: $clientId) {
      name
      clientId
      balance
      name
      groupId
      walletAddress
      ...BalanceFragment
    }
  }

  ${BALANCE_FRAGMENT}
`)

export type GetClientQuery = ResultOf<typeof GET_CLIENT>
export type GetClientVariables = VariablesOf<typeof GET_CLIENT>

export default GET_CLIENT
