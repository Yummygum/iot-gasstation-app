import { graphql, ResultOf, VariablesOf } from '../graphql'

const REMOVE_CLIENT_MUTATION = graphql(`
  mutation RemoveClient($clientId: UUID!) {
    removeClient(clientId: $clientId)
  }
`)

export type RemoveClientMutationVariables = VariablesOf<
  typeof REMOVE_CLIENT_MUTATION
>

export type RemoveClientMutationResult = ResultOf<typeof REMOVE_CLIENT_MUTATION>

export default REMOVE_CLIENT_MUTATION
