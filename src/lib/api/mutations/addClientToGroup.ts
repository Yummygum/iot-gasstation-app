import { graphql, ResultOf, VariablesOf } from 'gql.tada'

const ADD_CLIENT_TO_GROUP_MUTATION = graphql(`
  mutation AddClientToGroup($groupId: UUID!, $clientId: UUID!) {
    addClientToGroup(groupId: $groupId, clientId: $clientId) {
      groupId
      balance
      members
      name
    }
  }
`)

export type AddClientToGroupMutationVariables = VariablesOf<
  typeof ADD_CLIENT_TO_GROUP_MUTATION
>

export type AddClientToGroupMutationResult = ResultOf<
  typeof ADD_CLIENT_TO_GROUP_MUTATION
>

export default ADD_CLIENT_TO_GROUP_MUTATION
