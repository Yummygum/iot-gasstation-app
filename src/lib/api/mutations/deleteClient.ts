import { graphql, VariablesOf } from '../graphql'

const DELETE_CLIENT_MUTATION = graphql(`
  mutation DeleteClient($clientId: UUID!) {
    deleteClient: removeClient(clientId: $clientId)
  }
`)

export type DeleteClientMutationVariables = VariablesOf<
  typeof DELETE_CLIENT_MUTATION
>

export default DELETE_CLIENT_MUTATION
