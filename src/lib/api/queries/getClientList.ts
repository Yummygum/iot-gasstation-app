import { graphql, ResultOf } from '../graphql'

const GET_CLIENT_LIST = graphql(`
  query GetClientList {
    getClientList {
      name
      walletAddress
      balance
      groupId
      logoUri
      clientId
      metrics {
        firstTransaction
        lastTransaction
        allTime {
          totalTransactions
        }
      }
    }
  }
`)

export type GetClientListQuery = ResultOf<typeof GET_CLIENT_LIST>
export default GET_CLIENT_LIST
