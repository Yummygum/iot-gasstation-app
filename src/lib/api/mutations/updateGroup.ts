import { graphql, VariablesOf } from '../graphql'

const UPDATE_GROUP_MUTATION = graphql(`
  mutation UpdateGroup($groupId: UUID!, $name: String!) {
    updateGroup(groupId: $groupId, name: $name) {
      name
      groupId
      balance
      members
    }
  }
`)

export type UpdateGroupMutationVariables = VariablesOf<
  typeof UPDATE_GROUP_MUTATION
>

export default UPDATE_GROUP_MUTATION


