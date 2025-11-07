import { graphql, ResultOf } from '../graphql'

const CLIENT_UPDATES_SUBSCRIPTION = graphql(`
  subscription GetClientUpdatesSubscription {
    clientUpdates {
      balance
      clientId
      groupId
      name
      walletAddress
    }
  }
`)

export type ClientUpdatesSubscription = ResultOf<
  typeof CLIENT_UPDATES_SUBSCRIPTION
>

export default CLIENT_UPDATES_SUBSCRIPTION
