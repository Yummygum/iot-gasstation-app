import { graphql, ResultOf } from 'gql.tada'

export const GROUP_UPDATES_SUBSCRIPTION = graphql(`
  subscription GroupUpdatesSubscription {
    groupUpdates {
      groupId
      name
      balance
      name
    }
  }
`)

export type GroupUpdatesSubscription = ResultOf<
  typeof GROUP_UPDATES_SUBSCRIPTION
>

export default GROUP_UPDATES_SUBSCRIPTION
