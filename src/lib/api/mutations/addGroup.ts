import { graphql, VariablesOf } from '../graphql'

const ADD_GROUP_MUTATION = graphql(`
  mutation AddGroup($name: String!) {
    createGroup(name: $name) {
      groupId
      name
    }
  }
`)

export type AddClientMutationVariables = VariablesOf<typeof ADD_GROUP_MUTATION>

export default ADD_GROUP_MUTATION
