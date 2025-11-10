import { graphql, VariablesOf } from '../graphql'

const CREATE_GROUP_MUTATION = graphql(`
  mutation CreateGroup($name: String!) {
    createGroup(name: $name) {
      name
      groupId
      balance
      members
    }
  }
`)

export type CreateGroupMutationVariables = VariablesOf<
  typeof CREATE_GROUP_MUTATION
>

export default CREATE_GROUP_MUTATION
