import { graphql, ResultOf } from 'gql.tada'

const GET_CLIENT_LIST = graphql(`
  query GetClientList {
    getClientList {
      name
      clientId
    }
  }
`)

export type GetClientListQuery = ResultOf<typeof GET_CLIENT_LIST>
export default GET_CLIENT_LIST
