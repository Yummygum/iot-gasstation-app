import { graphql, VariablesOf } from '../graphql'

const DELETE_GROUP_MUTATION = graphql(`
  mutation DeleteGroup($groupId: UUID!) {
    deleteGroup(groupId: $groupId)
  }
`)

export type DeleteGroupMutationVariables = VariablesOf<
  typeof DELETE_GROUP_MUTATION
>

export default DELETE_GROUP_MUTATION
