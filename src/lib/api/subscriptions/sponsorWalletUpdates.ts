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
        firstTransaction
        lastTransaction
        allTime {
          totalTransactions
          totalSponsoredAmount
          totalSponsoredAmountIot
          totalSponsoredAmountEur
          totalSponsoredAmountUsd
          averageTransactionFee
          averageTransactionFeeIot
          averageTransactionFeeEur
          averageTransactionFeeUsd
          averageDailyTransactions
          averageDailySponsoredAmount
          averageDailySponsoredAmountIot
          averageDailySponsoredAmountEur
          averageDailySponsoredAmountUsd
          maxTransactionFee
          maxTransactionFeeIot
          maxTransactionFeeEur
          maxTransactionFeeUsd
          minTransactionFee
          minTransactionFeeIot
          minTransactionFeeEur
          minTransactionFeeUsd
        }
        last7Days {
          totalTransactions
          totalSponsoredAmount
          totalSponsoredAmountIot
          totalSponsoredAmountEur
          totalSponsoredAmountUsd
          averageTransactionFee
          averageTransactionFeeIot
          averageTransactionFeeEur
          averageTransactionFeeUsd
          averageDailyTransactions
          averageDailySponsoredAmount
          averageDailySponsoredAmountIot
          averageDailySponsoredAmountEur
          averageDailySponsoredAmountUsd
          maxTransactionFee
          maxTransactionFeeIot
          maxTransactionFeeEur
          maxTransactionFeeUsd
          minTransactionFee
          minTransactionFeeIot
          minTransactionFeeEur
          minTransactionFeeUsd
        }
        last30Days {
          totalTransactions
          totalSponsoredAmount
          totalSponsoredAmountIot
          totalSponsoredAmountEur
          totalSponsoredAmountUsd
          averageTransactionFee
          averageTransactionFeeIot
          averageTransactionFeeEur
          averageTransactionFeeUsd
          averageDailyTransactions
          averageDailySponsoredAmount
          averageDailySponsoredAmountIot
          averageDailySponsoredAmountEur
          averageDailySponsoredAmountUsd
          maxTransactionFee
          maxTransactionFeeIot
          maxTransactionFeeEur
          maxTransactionFeeUsd
          minTransactionFee
          minTransactionFeeIot
          minTransactionFeeEur
          minTransactionFeeUsd
        }
        last90Days {
          totalTransactions
          totalSponsoredAmount
          totalSponsoredAmountIot
          totalSponsoredAmountEur
          totalSponsoredAmountUsd
          averageTransactionFee
          averageTransactionFeeIot
          averageTransactionFeeEur
          averageTransactionFeeUsd
          averageDailyTransactions
          averageDailySponsoredAmount
          averageDailySponsoredAmountIot
          averageDailySponsoredAmountEur
          averageDailySponsoredAmountUsd
          maxTransactionFee
          maxTransactionFeeIot
          maxTransactionFeeEur
          maxTransactionFeeUsd
          minTransactionFee
          minTransactionFeeIot
          minTransactionFeeEur
          minTransactionFeeUsd
        }
      }
    }
  }
`)

export type SponsorWalletUpdatesSubscription = ResultOf<
  typeof SPONSOR_WALLET_UPDATES_SUBSCRIPTION
>

export default SPONSOR_WALLET_UPDATES_SUBSCRIPTION
