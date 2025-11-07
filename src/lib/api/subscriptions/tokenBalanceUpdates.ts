import { graphql, ResultOf } from '../graphql'

const TOKEN_BALANCE_UPDATES_SUBSCRIPTION = graphql(`
  subscription TokenBalanceUpdatesSubscription {
    tokenBalanceUpdates {
      balance
      timestamp
      action
    }
  }
`)

export type TokenBalanceUpdatesSubscription = ResultOf<
  typeof TOKEN_BALANCE_UPDATES_SUBSCRIPTION
>

export default TOKEN_BALANCE_UPDATES_SUBSCRIPTION
