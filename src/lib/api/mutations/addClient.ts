import { graphql, VariablesOf } from '../graphql'

const ADD_CLIENT_MUTATION = graphql(`
  mutation AddClient($name: String!, $walletAddress: String!) {
    registerClient(name: $name, walletAddress: $walletAddress) {
      balance
      clientId
      groupId
      name
      walletAddress
    }
  }
`)

export type AddClientMutationVariables = VariablesOf<typeof ADD_CLIENT_MUTATION>

export default ADD_CLIENT_MUTATION
