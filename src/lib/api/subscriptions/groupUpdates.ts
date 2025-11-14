import { graphql, ResultOf } from '../graphql'

export const GROUP_UPDATES_SUBSCRIPTION = graphql(`
  subscription GroupUpdatesSubscription {
    groupUpdates {
      groupId
      balance
      members
      name
      estimatedRemainingTransactions
      estimatedDepletionDate
      logoUri
      metrics {
        allTime {
          totalTransactions
        }
      }
      status {
        variant
      }
    }
  }
`)

export type GroupUpdatesSubscription = ResultOf<
  typeof GROUP_UPDATES_SUBSCRIPTION
>

export default GROUP_UPDATES_SUBSCRIPTION
