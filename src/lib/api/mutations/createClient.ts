import { graphql, VariablesOf } from '../graphql'

const CREATE_CLIENT_MUTATION = graphql(`
  mutation CreateClient($name: String!, $walletAddress: String!) {
    registerClient(name: $name, walletAddress: $walletAddress) {
      balance
      clientId
      groupId
      name
      walletAddress
    }
  }
`)

export type CreateClientMutationVariables = VariablesOf<
  typeof CREATE_CLIENT_MUTATION
>

export default CREATE_CLIENT_MUTATION
