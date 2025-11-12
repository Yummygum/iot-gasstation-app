import { graphql, VariablesOf } from '../graphql'

const CREATE_GROUP_MUTATION = graphql(`
  mutation CreateGroup($name: String!, $logoUri: Url) {
    createGroup(name: $name, logoUri: $logoUri) {
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
