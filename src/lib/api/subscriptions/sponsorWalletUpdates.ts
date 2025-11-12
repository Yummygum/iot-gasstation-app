import { graphql, ResultOf } from '../graphql'

const SPONSOR_WALLET_UPDATES_SUBSCRIPTION = graphql(`
  subscription SponsorWalletUpdatesSubscription {
    sponsorWalletUpdates {
      balance
      sponsorWalletId
      name
      logoUri
      address
      estimatedRemainingTransactions
      estimatedDepletionDate
      metrics {
        allTime {
          totalTransactions
        }
      }
    }
  }
`)

export type SponsorWalletUpdatesSubscription = ResultOf<
  typeof SPONSOR_WALLET_UPDATES_SUBSCRIPTION
>

export default SPONSOR_WALLET_UPDATES_SUBSCRIPTION
