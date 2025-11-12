import { graphql, VariablesOf } from '../graphql'

const UPDATE_GROUP_MUTATION = graphql(`
  mutation UpdateGroup($input: UpdateGroupInput!) {
    updateGroup(input: $input) {
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
