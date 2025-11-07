import { graphql, ResultOf, VariablesOf } from '../graphql'

const GET_GROUP = graphql(`
  query GetGroup($groupId: UUID!) {
    getGroup(groupId: $groupId) {
      groupId
      balance
      members
    }
  }
`)

export type GetGroupQuery = ResultOf<typeof GET_GROUP>
export type GetGroupVariables = VariablesOf<typeof GET_GROUP>

export default GET_GROUP
