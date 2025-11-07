import { graphql, ResultOf, VariablesOf } from '../graphql'

const GET_GROUP_LIST = graphql(`
  query GetGroupList {
    getGroupList {
      name
      groupId
      balance
      members
    }
  }
`)

export type GetGroupListQuery = ResultOf<typeof GET_GROUP_LIST>
export type GetGroupListVariables = VariablesOf<typeof GET_GROUP_LIST>

export default GET_GROUP_LIST
