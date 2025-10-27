import { graphql, ResultOf } from 'gql.tada'

const TOKEN_BALANCE_SUBSCRIPTION = graphql(`
  subscription GetTokenBalanceSubscription {
    tokenBalanceUpdates {
      balance
      timestamp
      action
    }
  }
`)
export type TokenBalanceSubscription = ResultOf<
  typeof TOKEN_BALANCE_SUBSCRIPTION
>
export default TOKEN_BALANCE_SUBSCRIPTION
