import { graphql } from '../graphql'

const GET_SPONSOR_WALLET = graphql(`
  query GetSponsorWallet {
    getSponsorWallet {
      sponsorWalletId
      address
      balance
      name
      logoUri
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

export default GET_SPONSOR_WALLET
