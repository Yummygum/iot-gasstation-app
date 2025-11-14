import { graphql, ResultOf } from '../graphql'

const GET_CLIENT_LIST = graphql(`
  query GetClientList($groupId: UUID) {
    getClientList(groupId: $groupId) {
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
          averageDailyTransactions
        }
        last7Days {
          totalTransactions
        }
      }
    }
  }
`)

export type GetClientListQuery = ResultOf<typeof GET_CLIENT_LIST>
export default GET_CLIENT_LIST
